'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProfessionalCompanyDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

var _autocomplete = require('../autocomplete');

/**
 * @extends BaseDto
 */
class ProfessionalCompanyDto extends _BaseDto.BaseDto {
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
        this.company = _autocomplete.AutocompleteDto.model(professionalCompany.get('company'));

        /**
         * @type {boolean}
         */
        this.location = _autocomplete.AutocompleteDto.model(professionalCompany.get('location'));
    }

    static arrayModel(data) {
        if (data.length) {
            return data.map(item => new ProfessionalCompanyDto(item));
        } else {
            return [];
        }
    }

    static get schema() {
        return {
            title: 'StudentSchoolSchema',
            type: 'object',
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    company: _autocomplete.AutocompleteDto.schema,
                    location: _autocomplete.AutocompleteDto.schema,
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    isCurrent: {
                        type: 'boolean',
                        default: false
                    },
                    fromDate: {
                        type: 'number'
                    },
                    toDate: {
                        type: 'number'
                    }
                }
            }]
        };
    }
}
exports.ProfessionalCompanyDto = ProfessionalCompanyDto;
//# sourceMappingURL=ProfessionalCompanyDto.js.map