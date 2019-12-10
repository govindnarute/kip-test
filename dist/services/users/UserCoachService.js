'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class UserCoachService {
    constructor({ DBConnection }) {
        this.dbConnection = DBConnection;
        this.Credential = DBConnection.model('Credential');
        this.Expertise = DBConnection.model('Expertise');
        this.UserCoach = DBConnection.model('UserCoach');
        this.CoachExpertise = DBConnection.model('CoachExpertise');
        this.CoachCredential = DBConnection.model('CoachCredential');
    }

    /**
     * Get credentials by id
     * @param id
     * @returns {Promise}
     */
    async getCredentialsById(id) {
        return this.Credential.findByPk(id);
    }

    /**
     * Bulk create companies
     * @param namesArray
     * @returns {Promise}
     */
    async bulkCreateExpertise(namesArray) {
        return this.Expertise.bulkCreate(namesArray);
    }

    async deleteUserCoachByUserId(userId) {
        return this.UserCoach.destroy({ where: { userId } });
    }

    /**
     * Save user coach
     * @param data
     * @returns {Promise}
     */
    async saveUserCoach(data) {
        return this.UserCoach.create(data);
    }

    /**
     * Bulk create ProfessionalFunction
     * @param expertise
     * @param coachId
     * @returns {Promise}
     */
    async bulkCreateCoachExpertise(expertise, coachId) {
        const expertiseArray = expertise.map(item => ({
            userCoachId: coachId,
            expertiseId: item.id
        }));

        return this.CoachExpertise.bulkCreate(expertiseArray);
    }

    /**
     * Bulk create ProfessionalFunction
     * @param credentials
     * @param coachId
     * @returns {Promise}
     */
    async bulkCreateCoachCredentials(credentials, coachId) {
        const credentialsArray = credentials.map(item => ({
            userCoachId: coachId,
            credentialId: item.id
        }));

        return this.CoachCredential.bulkCreate(credentialsArray);
    }

    /**
     * Get user coach full data
     * @param userId
     * @returns {Promise}
     */
    async getUserCoachFullData(userId) {
        return this.UserCoach.scope('withExpertise', 'withCredential').findOne({ where: { userId } });
    }
}
exports.default = UserCoachService;
//# sourceMappingURL=UserCoachService.js.map