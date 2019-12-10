import {
    NotFoundError,
    UnprocessableError,
    ForbiddenError
} from '../../utils/http';
import { MaskHelper } from '../../helpers/MaskHelper';

export default class UsersService {
    constructor({ DBConnection }) {
        this.dbConnection = DBConnection;
        this.User = DBConnection.model('User');
        this.UserCompensations = DBConnection.model('UserCompensations');
        this.UserAvailability = DBConnection.model('UserAvailability');
    }

    /**
     * Get providers (seeker-providers)
     * @param query
     * @param userId
     * @returns {Promise.<*>}
     */
    async getProviders(query, userId) {
        const providers = await this.dbConnection.query(
            `
    SELECT SQL_CALC_FOUND_ROWS
    users.id,
    users.firstName,
    users.lastName,
    users.email,
    (
      SELECT images.name FROM usersImages
      INNER JOIN images ON images.id = usersImages.imageId
      WHERE usersImages.userId = users.id LIMIT 1
    ) as avatar,
    (
      SELECT JSON_ARRAYAGG(f.name) FROM userProfessionals AS p
      LEFT JOIN professionalIndustries AS pf ON pf.userProfessionalId = p.id
      LEFT JOIN industries AS f ON pf.industryId = f.id
      WHERE p.userId = users.id
      ORDER BY f.name
    ) as industries,
    users.headline,
    users.summary,
    locations.name AS location
    FROM users
    INNER JOIN userAvailability AS availability ON availability.userId = users.id
    INNER JOIN userCompensations AS compensation ON compensation.userId = users.id
    LEFT JOIN locations ON locations.id = users.id
    LEFT JOIN userProfessionals AS professionals ON professionals.userId = users.id
    LEFT JOIN userCoaches AS coaches ON coaches.userId = users.id
    LEFT JOIN professionalFunctions ON professionalFunctions.userProfessionalId = professionals.id
    LEFT JOIN professionalIndustries ON professionalIndustries.userProfessionalId = professionals.id
    LEFT JOIN industries ON industries.id = professionalIndustries.industryId
    WHERE users.id != :userId AND type IN (2, 3) -- exclude self, include only 2 - provider, 3 - both
    -- Prefilter #1
    AND isKnowledgeProviderAvailable(users.id)
    -- Prefilter #2
    AND (
        CASE availability.availableFor
        -- everyone
        WHEN 1 THEN TRUE
        -- students
        WHEN 2 THEN (SELECT identities & 0b11 != 0 FROM users WHERE id = :userId)
        -- professionals
        WHEN 3 THEN (SELECT identities & 0b1100 != 0 FROM users WHERE id = :userId)
        -- fromMySchool
        WHEN 4 THEN haveCommonSchools(:userId, users.id)
        ELSE FALSE
        END
    )
    -- Prefilter #3
    -- AND hasCompletedProfile(users.id)
    
    -- #1 Keyword
    AND (
        :keyword IS NULL
        OR users.firstName LIKE :keyword
        OR users.lastName LIKE :keyword
        OR CONCAT(users.firstName, ' ', users.lastName) LIKE :keyword
        OR users.headline LIKE :keyword
        OR users.summary LIKE :keyword
        OR users.headline LIKE :keyword
        OR compensation.notes LIKE :keyword
        OR (SELECT EXISTS(SELECT 1 FROM functions WHERE id = professionalFunctions.functionId AND name LIKE :keyword))
        OR (SELECT EXISTS(SELECT 1 FROM industries WHERE id = professionalIndustries.industryId AND name LIKE :keyword))
    )
    
    -- #2 Identity
    AND (:identities IS NULL OR -- both 
        CASE :identities
        -- professors
        WHEN 1 THEN (SELECT 1 WHERE identities IN (4,5,6,7,12,13,14,15))
        -- coach
        WHEN 2 THEN (SELECT 1 WHERE identities IN (8,9,10,11,12,13,14,15))
        -- both 
        WHEN 3 THEN (SELECT 1 WHERE identities IN (4,5,6,7,8,9,10,11,12,13,14,15))
        END
    )
    
    -- #3 Industry
    AND (NOT :hasIndustries OR professionalIndustries.industryId IN (:industriesId))
    
    -- #4 Function
    AND (NOT :hasFunctions OR professionalFunctions.functionId IN (:functionsId))
    

    -- #5 Location
    AND (NOT :hasLocations OR locationId IN (:locationsId))
    
    -- #6 Min yrs of experience
    AND (:minExp IS NULL OR professionals.yearOfExperience >= :minExp OR coaches.yearOfExperience >= :minExp)
    
    -- #7 From my schools
    AND (:fromMySchool IS NULL OR NOT :fromMySchool OR haveCommonSchools(:userId, users.id))

    -- #8 In my groups?
    AND (:fromMyGroup IS NULL OR NOT :fromMyGroup OR haveCommonGroups(:userId, users.id))

    GROUP BY users.id

    LIMIT :offset, :limit;
`,
            {
                replacements: {
                    userId: userId,
                    offset: query.offset,
                    limit: query.limit,
                    fromMySchool: query.fromMySchool || false,
                    fromMyGroup: query.fromMyGroup || null,
                    minExp: query.minExp || null,
                    identities: query.identities || null,
                    hasLocations:
                        (query.locationsId && query.locationsId.length) ||
                        false,
                    locationsId: query.locationsId || [-1],
                    hasIndustries:
                        (query.industriesId && query.industriesId.length) ||
                        false,
                    industriesId: query.industriesId || [-1],
                    hasFunctions:
                        (query.functionsId && query.functionsId.length) ||
                        false,
                    functionsId: query.functionsId || [-1],
                    keyword: query.keyword ? '%' + query.keyword + '%' : null
                },
                type: this.dbConnection.QueryTypes.SELECT
            }
        );

        const count = await this.dbConnection.query('SELECT FOUND_ROWS();', {
            type: this.dbConnection.QueryTypes.SELECT
        });

        const totalCount = count[0]['FOUND_ROWS()'];

        const resultProviders = { providers, totalCount };

        return resultProviders;
    }

    /**
     * Get providers without pagination
     * @param scopes
     * @returns {Promise.<*>}
     */
    async getProvidersWithoutPagination(scopes) {
        return await this.User.scope(scopes).findAll();
    }

    /**
     * Set scopes and get providers
     * @param query
     * @param userId
     * @returns {Promise.<*>}
     */
    async setScopesAndGetProviders(query, userId, withoutPagination = false) {
        let list = [];
        let listData = {};
        const scopes = [];
        let count;

        if (withoutPagination) {
            list = await this.getProvidersWithoutPagination(scopes);
        } else {
            listData = await this.getProviders(scopes, query, userId);
            list = listData.rows;
            count = listData.count;
        }

        return { list, count };
    }

    /**
     * Check user availability to dashboard
     * @param request
     * @param response
     * @param next
     * @returns {Promise.<*>}
     */
    async checkProfileCompleted(request, response, next) {
        const hasCompletedProfile = await this.dbConnection.query(
            'SELECT hasCompletedProfile(:userId)',
            {
                replacements: { userId: request.user.userId },
                type: this.dbConnection.QueryTypes.SELECT
            }
        );

        if (
            !hasCompletedProfile[0][
                `hasCompletedProfile(${request.user.userId})`
            ]
        ) {
            return next(new ForbiddenError('ACCESS_DENIED'));
        }

        next();
    }

    /**
     * Check user verification
     * @param request
     * @param response
     * @param next
     * @returns {Promise.<*>}
     */
    async checkUserVerification(request, response, next) {
        const user = await this.User.findByPk(request.user.userId);

        if (!user) {
            return next(new NotFoundError('USER_NOT_FOUND'));
        }

        next();
    }

    /**
     * Check user for refresh
     * @param userId
     * @returns {Promise.<void>}
     */
    async checkUserForRefresh(userId) {
        const user = await this.User.findByPk(userId);

        if (!user) {
            throw new UnprocessableError('USER_NOT_FOUND');
        }
    }

    /**
     * Get count
     * @param scopes
     * @returns {Promise.<void>}
     */
    async getCount(scopes) {
        return this.User.scope(scopes).count();
    }

    /**
     * Get user by id
     * @param userId
     * @param scope
     * @returns {Promise.<Promise.<Model>|Bluebird<any | TInstance>>}
     */
    async getUserById(userId, scope = []) {
        return this.User.scope(scope.concat('withAvatar')).findByPk(userId);
    }

    /**
     * Update user by id
     * @param userId
     * @param updateData
     * @param scope
     * @returns {Promise.<Promise.<Model>|Bluebird<any | TInstance>>}
     */
    async updatesUserById(userId, updateData) {
        return this.User.update(updateData, { where: { id: userId } });
    }

    /**
     * Get user by email
     * @param email
     * @param scope
     * @returns {Promise.<Promise.<Model>|Bluebird<any | TInstance>>}
     */
    async getUserByEmail(email, scope = []) {
        return this.User.scope(scope.concat('withAvatar')).findOne({
            where: { email }
        });
    }

    /**
     * Create user
     * @param body
     * @returns {Promise.<user>}
     */
    async createUser(body) {
        return new this.User(Object.assign({}, body)).save();
    }

    /**
     * Get user by email and verification token
     * @param email
     * @param type
     * @param scope
     * @returns {Promise.<Promise.<Model>|Bluebird<any | TInstance>>}
     */
    async getUserByEmailWithVerificationToken(email, type, scope = []) {
        const scopes = [{ method: ['withTokenByType', type] }];
        scopes.push(scope);

        return this.User.scope(scopes).findOne({ where: { email } });
    }

    /**
     * Get user compensation
     * @param userId
     * @returns {Promise.<Promise>}
     */
    async getUserCompensations(userId) {
        return this.UserCompensations.findOne({ where: { userId } });
    }

    /**
     * Create user compensation
     * @param data
     * @returns {Promise.<Promise>}
     */
    async saveUserCompensations(data) {
        return new this.UserCompensations(Object.assign({}, data)).save();
    }

    async getUserAvailability(userId) {
        return this.UserAvailability.findOne({ where: { userId } });
    }

    /**
     * Create user availability
     * @param data
     * @returns {Promise.<Promise>}
     */
    async saveUserAvailability(data) {
        return new this.UserAvailability(Object.assign({}, data)).save();
    }

    /**
     * Check user identities
     * @param request
     * @param response
     * @param next
     * @returns {Promise.<*>}
     */
    async checkUserIdentities(request, response, next) {
        const user = await this.User.findByPk(request.user.userId);
        const mask = MaskHelper.parseMaskToFlags(user.identities);

        if (!mask.isProfessional && !mask.isCoach) {
            return next(new ForbiddenError('IDENTITY_ERROR'));
        }

        next();
    }
}
