import { BaseDto } from './../../base/BaseDto';
import { AutocompleteDto } from '../autocomplete';

/**
 * @extends BaseDto
 */
export class ProfessionalCompanyDto extends BaseDto {
    /**
     * @param {ProfessionalCompanyInstance} professionalCompany
     */
    constructor(professionalCompany) {
        super(professionalCompany);

        /**
         * @type {string}
         */
        this.title = professionalCompany.get('title');

        /**
         * @type {string}
         */
        this.description = professionalCompany.get('description');

        /**
         * @type {boolean}
         */
        this.isCurrent = professionalCompany.get('isCurrent');

        /**
         * @type {date}
         */
        this.fromDate = new Date(professionalCompany.get('fromDate')).getFullYear();

        /**
         * @type {date}
         */
        this.toDate = new Date(professionalCompany.get('toDate')).getFullYear();

        /**
         * @type {number}
         */
        this.company =  AutocompleteDto.model(professionalCompany.get('company'));

        /**
         * @type {boolean}
         */
        this.location = AutocompleteDto.model(professionalCompany.get('location'));
    }

    static arrayModel(data) {
        if(data.length) {
            return data.map(item => new ProfessionalCompanyDto(item));
        } else {
            return [];
        }
    }

    static get schema() {
        return {
            title: 'StudentSchoolSchema',
            type: 'object',
            allOf: [
                super.schema,
                {
                    type: 'object',
                    required: [
                    ],
                    properties: {
                        company: AutocompleteDto.schema,
                        location: AutocompleteDto.schema,
                        title: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        },
                        isCurrent: {
                            type: 'boolean',
                            default: false,
                        },
                        fromDate: {
                            type: 'number'
                        },
                        toDate: {
                            type: 'number'
                        }
                    }
                }
            ]
        };
    }
}
