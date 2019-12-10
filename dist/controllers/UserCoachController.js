'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('../utils/http');

var _userCoaches = require('../models/userCoaches');

class UserCoachController {
    constructor({ UserCompaniesService, DBConnection, UserCoachService, UserSchoolsService }) {
        this.dbConnection = DBConnection;
        this.Expertise = DBConnection.model('Expertise');
        this.Credential = DBConnection.model('Credential');
        this.userCompaniesService = UserCompaniesService;
        this.userCoachService = UserCoachService;
        this.userSchoolsService = UserSchoolsService;
    }

    async createCoachInfo(request) {
        let existingCredentials;
        const isCredentialsExist = !!(request.body.credentials && request.body.credentials.length);

        // Check credentials in DB
        if (isCredentialsExist) {
            existingCredentials = request.body.credentials.filter(item => item.id);
            const credentialsIds = existingCredentials.map(item => item.id);

            const credentialsCount = await this.userCompaniesService.countByIds(this.Credential, credentialsIds);
            if (credentialsCount !== credentialsIds.length) {
                throw new _http.NotFoundError('CREDENTIALS_NOT_FOUND');
            }
        }

        // Check expertise in DB
        let existingExpertise = request.body.expertise.filter(item => item.id);
        const expertiseIds = existingExpertise.map(item => item.id);

        const expertiseCount = await this.userCompaniesService.countByIds(this.Expertise, expertiseIds);
        if (expertiseCount !== expertiseIds.length) {
            throw new _http.NotFoundError('EXPERTISE_NOT_FOUND');
        }

        // Save new credentials
        if (isCredentialsExist) {
            const newCredentials = request.body.credentials.filter(item => !item.id);
            if (Array.isArray(newCredentials) && newCredentials.length) {
                let savedData;

                for (const [index, value] of newCredentials.entries()) {
                    savedData = await this.userSchoolsService.getOrSaveAutocompleteData(this.Credential, value.name);
                    newCredentials[index].id = savedData.id;
                }
                existingCredentials = existingCredentials.concat(newCredentials);
            }
        }

        // Save new expertise
        const newExpertise = request.body.expertise.filter(item => !item.id);
        if (Array.isArray(newExpertise) && newExpertise.length) {
            let savedData;

            for (const [index, value] of newExpertise.entries()) {
                savedData = await this.userSchoolsService.getOrSaveAutocompleteData(this.Expertise, value.name);
                newExpertise[index].id = savedData.id;
            }
            existingExpertise = existingExpertise.concat(newExpertise);
        }

        // Delete previous coach data
        await this.userCoachService.deleteUserCoachByUserId(request.user.userId);

        const dataForSave = {
            userId: request.user.userId,
            yearOfExperience: request.body.yearOfExperience
        };

        // Save new coach data
        const userCoach = await this.userCoachService.saveUserCoach(dataForSave);

        // Save coach credentials if exist
        if (isCredentialsExist) {
            await this.userCoachService.bulkCreateCoachCredentials(existingCredentials, userCoach.id);
        }
        // Save coach expertise
        await this.userCoachService.bulkCreateCoachExpertise(existingExpertise, userCoach.id);

        const userCoachFullData = await this.userCoachService.getUserCoachFullData(request.user.userId);

        return new _userCoaches.UserCoachDto(userCoachFullData);
    }
}
exports.default = UserCoachController;
//# sourceMappingURL=UserCoachController.js.map