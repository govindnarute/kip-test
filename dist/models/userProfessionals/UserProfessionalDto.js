'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserProfessionalDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

var _autocomplete = require('../autocomplete');

var _professionalCompanies = require('../professionalCompanies');

/**
 * @extends BaseDto
 */
class UserProfessionalDto extends _BaseDto.BaseDto {
    /**
     * @param {UserProfessionalInstance} userProfessional
     */
    constructor(userProfessional) {
        super(userProfessional);
        /**
         * @type {number}
         */
        this.yearOfExperience = userProfessional.get('yearOfExperience');

        /**
         * @type {number}
         */
        this.industries = _autocomplete.AutocompleteDto.arrayModel(userProfessional.get('industry'));

        /**
         * @type {number}
         */
        this.functions = _autocomplete.AutocompleteDto.arrayModel(userProfessional.get('function'));

        /**
         * @type {number}
         */
        this.companies = _professionalCompanies.ProfessionalCompanyDto.arrayModel(userProfessional.get('professionalCompany'));
    }

    static get schema() {
        return {
            title: 'UserProfessionalSchema',
            type: 'object',
            nullable: true,
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    yearOfExperience: {
                        type: 'number',
                        example: 1
                    },
                    industries: {
                        type: 'array',
                        items: _autocomplete.AutocompleteDto.schema
                    },
                    functions: {
                        type: 'array',
                        items: _autocomplete.AutocompleteDto.schema
                    },
                    companies: {
                        type: 'array',
                        items: _professionalCompanies.ProfessionalCompanyDto.schema
                    }
                }
            }]
        };
    }
}
exports.UserProfessionalDto = UserProfessionalDto;
//# sourceMappingURL=UserProfessionalDto.js.map