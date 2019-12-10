import { BaseDto } from './../../base/BaseDto';

/**
 * @extends BaseDto
 */
export class FieldOfStudyDto extends BaseDto {
    /**
     * @param {array} fieldOfStudy
     */
    constructor(fieldOfStudy) {
        super(fieldOfStudy);

        /**
         * @type {string}
         */
        this.name = fieldOfStudy.get('name');

    }

    static get schema() {
        return {
            title: 'FieldOfStudySchema',
            type: 'object',
            nullable: true,
            allOf: [
                super.schema,
                {
                    type: 'object',
                    required: [
                    ],
                    properties: {
                        name: {
                            type: 'string'
                        }
                    }
                }
            ]
        };
    }
}
