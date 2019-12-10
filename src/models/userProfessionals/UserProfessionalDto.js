import { BaseDto } from './../../base/BaseDto';
import { AutocompleteDto } from '../autocomplete';
import { ProfessionalCompanyDto } from '../professionalCompanies';

/**
 * @extends BaseDto
 */
export class UserProfessionalDto extends BaseDto {
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
        this.industries = AutocompleteDto.arrayModel(userProfessional.get('industry'));

        /**
         * @type {number}
         */
        this.functions = AutocompleteDto.arrayModel(userProfessional.get('function'));

        /**
         * @type {number}
         */
        this.companies = ProfessionalCompanyDto.arrayModel(userProfessional.get('professionalCompany'));
    }

    static get schema() {
        return {
            title: 'UserProfessionalSchema',
            type: 'object',
            nullable: true,
            allOf: [
                super.schema,
                {
                    type: 'object',
                    required: [
                    ],
                    properties: {
                        yearOfExperience: {
                            type: 'number',
                            example: 1
                        },
                        industries: {
                            type: 'array',
                            items: AutocompleteDto.schema
                        },
                        functions: {
                            type: 'array',
                            items: AutocompleteDto.schema
                        },
                        companies: {
                            type: 'array',
                            items: ProfessionalCompanyDto.schema
                        }
                    }
                }
            ]
        };
    }
}
