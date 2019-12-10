import { BaseDto } from './../../base/BaseDto';

/**
 * @extends BaseDto
 */
export class SchoolDto extends BaseDto {
    /**
     * @param {array} school
     */
    constructor(school) {
        super(school);

        /**
         * @type {string}
         */
        this.name = school.get('name');

    }

    static get schema() {
        return {
            title: 'SchoolSchema',
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
