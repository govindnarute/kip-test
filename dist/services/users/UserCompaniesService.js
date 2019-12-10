'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class UserCompaniesService {
    constructor({ DBConnection }) {
        this.dbConnection = DBConnection;
        this.ProfessionalIndustry = DBConnection.model('ProfessionalIndustry');
        this.ProfessionalFunction = DBConnection.model('ProfessionalFunction');
        this.ProfessionalCompany = DBConnection.model('ProfessionalCompany');
        this.Company = DBConnection.model('Company');
        this.UserProfessional = DBConnection.model('UserProfessional');
    }

    /**
     * Count by ids
     * @param ids
     * @param Model
     * @param scopes
     * @returns {Promise}
     */
    async countByIds(Model, ids, scopes = []) {
        return Model.scope(scopes.concat({ method: ['byIds', ids] })).count();
    }

    /**
     * Bulk create companies
     * @param namesArray
     * @returns {Promise}
     */
    async bulkCreateCompanies(namesArray) {
        return this.Company.bulkCreate(namesArray);
    }

    /**
     * delete UserProfessional data by user id
     * @param userId
     * @returns {Promise}
     */
    async deleteUserProfessionalByUserId(userId) {
        return this.UserProfessional.destroy({ where: { userId } });
    }

    /**
     * Get Industries by ids
     * @param userId
     * @param experience
     * @returns {Promise}
     */
    async saveUserProfessional(userId, experience) {
        return this.UserProfessional.create({
            userId,
            yearOfExperience: experience
        });
    }

    /**
     * Bulk create ProfessionalIndustry
     * @param industries
     * @param professionalId
     * @returns {Promise}
     */
    async bulkCreateProfessionalIndustry(industries, professionalId) {
        const industriesArray = industries.map(item => ({
            userProfessionalId: professionalId,
            industryId: item.id
        }));

        return this.ProfessionalIndustry.bulkCreate(industriesArray);
    }

    /**
     * Bulk create ProfessionalFunction
     * @param functions
     * @param professionalId
     * @returns {Promise}
     */
    async bulkCreateProfessionalFunction(functions, professionalId) {
        const functionsArray = functions.map(item => ({
            userProfessionalId: professionalId,
            functionId: item.id
        }));

        return this.ProfessionalFunction.bulkCreate(functionsArray);
    }

    /**
     * Bulk create ProfessionalCompany
     * @param companies
     * @param professionalId
     * @returns {Promise}
     */
    async bulkCreateProfessionalCompany(companies, professionalId) {
        const companiesArray = companies.map(item => ({
            userProfessionalId: professionalId,
            companyId: item.company ? item.company.id : null,
            locationId: item.location ? item.location.id : null,
            title: item.title,
            description: item.description,
            isCurrent: item.isCurrent,
            fromDate: item.fromDate,
            toDate: item.toDate
        }));

        return this.ProfessionalCompany.bulkCreate(companiesArray);
    }

    /**
     * Get user company full data
     * @param userId
     * @returns {Promise}
     */
    async getUserProfessionalFullData(userId) {
        return this.UserProfessional.scope('withIndustry', 'withFunction', 'withProfessionalCompany').findOne({ where: { userId } });
    }
}
exports.default = UserCompaniesService;
//# sourceMappingURL=UserCompaniesService.js.map