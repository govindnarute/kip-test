import { PaginationHelper } from '../helpers/PaginationHelper';
import { AutocompleteListDto } from '../models/autocomplete/AutocompleteListDto';

export default class AutocompleteController {
    constructor({ AutocompleteService, DBConnection }) {
        this.autocompleteService = AutocompleteService;
        this.School = DBConnection.model('School');
        this.Location = DBConnection.model('Location');
        this.Degree = DBConnection.model('Degree');
        this.FieldOfStudy = DBConnection.model('FieldOfStudy');
        this.Company = DBConnection.model('Company');
        this.Industry = DBConnection.model('Industry');
        this.Function = DBConnection.model('Function');
        this.Expertise = DBConnection.model('Expertise');
        this.Credential = DBConnection.model('Credential');
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getLocations(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.Location, request.query);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getSchools(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.School, request.query);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getDegrees(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.Degree, request.query);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getFieldsOfStudy(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.FieldOfStudy, request.query);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getCompanies(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.Company, request.query);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getIndustries(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.Industry, request.query, true);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getFunctions(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.Function, request.query, true);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getExpertise(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.Expertise, request.query);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<AutocompleteListDto>}
     */
    async getCredentials(request) {
        const { list, count } = await this.autocompleteService.setScopesAndGetList(this.Credential, request.query);

        return new AutocompleteListDto(list, PaginationHelper.buildPagination(request.query, count));
    }
}
