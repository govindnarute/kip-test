import { NotFoundError, BadRequestError } from '../utils/http';
import { UserProfessionalDto } from '../models/userProfessionals';

export default class CompaniesController {
    constructor({ UserCompaniesService, DBConnection, UserSchoolsService }) {
        this.dbConnection = DBConnection;
        this.Industry = DBConnection.model('Industry');
        this.Function = DBConnection.model('Function');
        this.Company = DBConnection.model('Company');
        this.Location = DBConnection.model('Location');

        this.userCompaniesService = UserCompaniesService;
        this.userSchoolsService = UserSchoolsService;
    }

    async createCompanies(request) {
        if (request.body.fromDate && request.body.toDate && request.body.fromDate > request.body.toDate) {
            throw new BadRequestError('toDate must be greater or equal than fromDate');
        }

        let companies = [];
        const industriesIds = request.body.industries.map(item => item.id);
        const functionsIds = request.body.functions.map(item => item.id);

        /**
         * Count by Ids and compare with requested elements
         */
        const industriesCount = await this.userCompaniesService.countByIds(this.Industry, industriesIds);
        if (industriesCount !== industriesIds.length) {
            throw new NotFoundError('INDUSTRY_NOT_FOUND');
        }

        const functionsCount = await this.userCompaniesService.countByIds(this.Function, functionsIds);
        if (functionsCount !== functionsIds.length) {
            throw new NotFoundError('FUNCTION_NOT_FOUND');
        }

        const existingCompanies = request.body.companies.filter(item => item.company.id);
        if (existingCompanies.length) {
            let companiesIds = existingCompanies.map(item => item.company.id);
            companiesIds = Array.from(new Set(companiesIds));

            const companiesCount = await this.userCompaniesService.countByIds(this.Company, companiesIds);

            if (companiesCount !== companiesIds.length) {
                throw new NotFoundError('COMPANY_NOT_FOUND');
            }

            companies = existingCompanies;
        }

        const existingLocations = request.body.companies.filter(item => item.location);
        if (existingLocations.length) {
            let locationsIds = existingLocations.map(item => item.location.id);
            locationsIds = Array.from(new Set(locationsIds));

            const locationsCount = await this.userCompaniesService.countByIds(this.Location, locationsIds);

            if (locationsCount !== locationsIds.length) {
                throw new NotFoundError('LOCATION_NOT_FOUND');
            }
        }

        /**
         * Check new company exists.
         * Save company with bulk create
         * Map saved companies and push to already existing company array (check by name, because name is unique)
         */
        const newCompanies = request.body.companies.filter(item => !item.company.id);
        if (Array.isArray(newCompanies) && newCompanies.length) {
            let savedData;

            // Check all nullable field and save new autocomplete data
            for (const [index, value] of newCompanies.entries()) {
                savedData = await this.userSchoolsService.getOrSaveAutocompleteData(this.Company, value.company.name);
                newCompanies[index].company.id = savedData.id;
            }

            companies = existingCompanies.concat(newCompanies);
        }

        // TODO: Make valid date for saving to DB (client send only year)
        companies = companies.map((item) => {
            item.fromDate = item.fromDate ? `${item.fromDate}-01-01` : new Date();
            item.toDate = item.toDate ? `${item.toDate}-01-01` : new Date();

            return item;
        });

        await this.userCompaniesService.deleteUserProfessionalByUserId(request.user.userId);
        // Save all professional data
        const userProfessional = await this.userCompaniesService.saveUserProfessional(request.user.userId, request.body.yearOfExperience);

        await this.userCompaniesService.bulkCreateProfessionalIndustry(request.body.industries, userProfessional.id);
        await this.userCompaniesService.bulkCreateProfessionalFunction(request.body.functions, userProfessional.id);
        await this.userCompaniesService.bulkCreateProfessionalCompany(companies, userProfessional.id);

        const userCompany = await this.userCompaniesService.getUserProfessionalFullData(request.user.userId);

        return new UserProfessionalDto(userCompany);
    }
}
