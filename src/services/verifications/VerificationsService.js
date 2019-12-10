import JWT from 'jsonwebtoken';
import { tokenTypes } from '../../resources/users';

export default class VerificationsService {
    constructor({ config, DBConnection }) {
        this.config = config;
        this.VerificationToken = DBConnection.model('VerificationToken');
    }

    /**
     * Generate token
     * @param {UserDto} user
     * @param {number} tokenLifeTime
     * @return {*}
     */
    generateToken(user, tokenLifeTime) {
        return JWT.sign({
            data: { userId: user.id }
        }, this.config.get('jwt.key'), {
            expiresIn: tokenLifeTime || this.config.mailer.tokenLifeTime,
        });
    }

    /**
     * Save token
     * @param userId
     * @param token
     * @param type
     * @returns {Promise.<void>}
     */
    saveToken(userId, token, type) {
        return this.VerificationToken.create({
            userId,
            token,
            type
        });
    }

    /**
     * Save token
     * @param user
     * @param token
     * @param type
     * @returns {Promise.<void>}
     */
    updateOrCreateToken(user, token, type = tokenTypes.verification) {
        let attempt = 0;

        if(user.verificationToken) {
            attempt = type === tokenTypes.verification ? user.verificationToken.attempt + 1 : 0;
            return user.verificationToken.update({ token, attempt, isUsed: false });
        }

        return this.VerificationToken.create({ token, attempt, userId: user.id, type });
    }

    /**
     * Get token by type
     * @param token
     * @param type
     * @returns {Promise.<Promise.<Model>|Promise<any | TInstance>>}
     */
    getTokenByType(token, type) {
        return this.VerificationToken
            .scope({ method: ['byType', type] })
            .findOne({ where: { token } });
    }
}
