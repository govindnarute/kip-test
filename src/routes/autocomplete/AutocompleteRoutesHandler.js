import { BasicHandler } from '../../base/BasicHandler';
import { AutocompleteListDto } from '../../models/autocomplete';
import { HttpStatusCode } from '../../resources/erros';

export default class AutocompleteRoutesHandler extends BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/autocomplete';
    }

    setup() {
        const controller = this.container.AutocompleteController;
        this.addRoute({
            path: '/locations',
            method: 'get',
            summary: 'Get locations list API',
            description: 'Location list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getLocations.bind(controller),
        });

        this.addRoute({
            path: '/schools',
            method: 'get',
            summary: 'Get school list API',
            description: 'School list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getSchools.bind(controller),
        });

        this.addRoute({
            path: '/degrees',
            method: 'get',
            summary: 'Get degree list API',
            description: 'Degree list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getDegrees.bind(controller),
        });

        this.addRoute({
            path: '/fieldsOfStudy',
            method: 'get',
            summary: 'Get fieldsOfStudy list API',
            description: 'FieldsOfStudy list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getFieldsOfStudy.bind(controller),
        });

        this.addRoute({
            path: '/companies',
            method: 'get',
            summary: 'Get companies list API',
            description: 'Companies list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getCompanies.bind(controller),
        });

        this.addRoute({
            path: '/industries',
            method: 'get',
            summary: 'Get industries list API',
            description: 'Industries list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getIndustries.bind(controller),
        });

        this.addRoute({
            path: '/functions',
            method: 'get',
            summary: 'Get functions list API',
            description: 'Functions list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getFunctions.bind(controller),
        });

        this.addRoute({
            path: '/expertise',
            method: 'get',
            summary: 'Get expertise list API',
            description: 'Expertise list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getExpertise.bind(controller),
        });

        this.addRoute({
            path: '/credentials',
            method: 'get',
            summary: 'Get credentials list API',
            description: 'Credentials list for autocomplete',
            tags: ['Autocomplete'],
            auth: false,
            consumes: this.container.BaseSearchListSchema,
            produces: AutocompleteListDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.getCredentials.bind(controller),
        });
    }
}
