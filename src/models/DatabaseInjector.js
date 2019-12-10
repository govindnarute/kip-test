import { UserModelFactory } from './users';
import { VerificationTokenModelFactory } from './verificationTokens';
import { SocialsModelFactory } from './socials';
import { ImagesModelFactory } from './images';
import { UsersImageModelFactory } from './usersImages';
import { LocationsModelFactory } from './locations';
import { SchoolsModelFactory } from './schools';
import { DegreesModelFactory } from './degrees';
import { FieldOfStudyModelFactory } from './fieldsOfStudy';
import { StudentSchoolsModelFactory } from './studentSchools';
import { CompaniesModelFactory } from './companies';
import { IndustriesModelFactory } from './industries';
import { FunctionsModelFactory } from './functions';
import { ExpertiseModelFactory } from './expertise';
import { CredentialsModelFactory } from './credentials';
import { UserProfessionalsModelFactory } from './userProfessionals';
import { ProfessionalFunctionsModelFactory } from './professionalFunctions';
import { ProfessionalIndustriesModelFactory } from './professionalIndustries';
import { ProfessionalCompaniesModelFactory } from './professionalCompanies';
import { UserCoachesModelFactory } from './userCoaches';
import { CoachExpertiseModelFactory } from './coachExpertise';
import { UserCompensationsModelFactory } from './userCompensations';
import { UserAvailabilityModelFactory } from './userAvailability';
import { CoachCredentialsModelFactory } from './coachCredentials/CoachCredentialsModelFactory';

export class DatabaseInjector {
    static injectModels(DBConnection) {
        const models = [
            UserModelFactory,
            VerificationTokenModelFactory,
            SocialsModelFactory,
            ImagesModelFactory,
            UsersImageModelFactory,
            LocationsModelFactory,
            SchoolsModelFactory,
            DegreesModelFactory,
            FieldOfStudyModelFactory,
            StudentSchoolsModelFactory,
            CompaniesModelFactory,
            IndustriesModelFactory,
            FunctionsModelFactory,
            ExpertiseModelFactory,
            CredentialsModelFactory,
            UserProfessionalsModelFactory,
            ProfessionalFunctionsModelFactory,
            ProfessionalIndustriesModelFactory,
            ProfessionalCompaniesModelFactory,
            UserCoachesModelFactory,
            CoachExpertiseModelFactory,
            UserCompensationsModelFactory,
            UserAvailabilityModelFactory,
            CoachCredentialsModelFactory
        ];

        models
            .map((ModelFactory) => ModelFactory.define(DBConnection))
            .forEach((model) => {
                if ('associate' in model) {
                    model.associate();
                }
            });
    }
}
