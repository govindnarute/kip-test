import { BaseDto } from './../../base/BaseDto';
import { AutocompleteDto } from '../autocomplete';

/**
 * @extends BaseDto
 */
export class UserCoachDto extends BaseDto {
    /**
     * @param {UserCoachInstance} userCoach
     */
    constructor(userCoach) {
        super(userCoach);
        /**
         * @type {number}
         */
        this.yearOfExperience = userCoach.get('yearOfExperience');

        /**
         * @type {number}
         */
        this.expertise = AutocompleteDto.arrayModel(userCoach.get('expertise'));

        /**
         * @type {number}
         */
        this.credential = AutocompleteDto.arrayModel(userCoach.get('credential'));
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
                        expertise: {
                            type: 'array',
                            items: AutocompleteDto.schema
                        },
                        credential: {
                            type: 'array',
                            items: AutocompleteDto.schema
                        }
                    }
                }
            ]
        };
    }
}
