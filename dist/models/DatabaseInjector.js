'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatabaseInjector = undefined;

var _users = require('./users');

var _verificationTokens = require('./verificationTokens');

var _socials = require('./socials');

var _images = require('./images');

var _usersImages = require('./usersImages');

var _locations = require('./locations');

var _schools = require('./schools');

var _degrees = require('./degrees');

var _fieldsOfStudy = require('./fieldsOfStudy');

var _studentSchools = require('./studentSchools');

var _companies = require('./companies');

var _industries = require('./industries');

var _functions = require('./functions');

var _expertise = require('./expertise');

var _credentials = require('./credentials');

var _userProfessionals = require('./userProfessionals');

var _professionalFunctions = require('./professionalFunctions');

var _professionalIndustries = require('./professionalIndustries');

var _professionalCompanies = require('./professionalCompanies');

var _userCoaches = require('./userCoaches');

var _coachExpertise = require('./coachExpertise');

var _userCompensations = require('./userCompensations');

var _userAvailability = require('./userAvailability');

var _CoachCredentialsModelFactory = require('./coachCredentials/CoachCredentialsModelFactory');

class DatabaseInjector {
    static injectModels(DBConnection) {
        const models = [_users.UserModelFactory, _verificationTokens.VerificationTokenModelFactory, _socials.SocialsModelFactory, _images.ImagesModelFactory, _usersImages.UsersImageModelFactory, _locations.LocationsModelFactory, _schools.SchoolsModelFactory, _degrees.DegreesModelFactory, _fieldsOfStudy.FieldOfStudyModelFactory, _studentSchools.StudentSchoolsModelFactory, _companies.CompaniesModelFactory, _industries.IndustriesModelFactory, _functions.FunctionsModelFactory, _expertise.ExpertiseModelFactory, _credentials.CredentialsModelFactory, _userProfessionals.UserProfessionalsModelFactory, _professionalFunctions.ProfessionalFunctionsModelFactory, _professionalIndustries.ProfessionalIndustriesModelFactory, _professionalCompanies.ProfessionalCompaniesModelFactory, _userCoaches.UserCoachesModelFactory, _coachExpertise.CoachExpertiseModelFactory, _userCompensations.UserCompensationsModelFactory, _userAvailability.UserAvailabilityModelFactory, _CoachCredentialsModelFactory.CoachCredentialsModelFactory];

        models.map(ModelFactory => ModelFactory.define(DBConnection)).forEach(model => {
            if ('associate' in model) {
                model.associate();
            }
        });
    }
}
exports.DatabaseInjector = DatabaseInjector;
//# sourceMappingURL=DatabaseInjector.js.map