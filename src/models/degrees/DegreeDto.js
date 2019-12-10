import { BaseDto } from './../../base/BaseDto';

/**
 * @extends BaseDto
 */
export class DegreeDto extends BaseDto {
    /**
     * @param {array} degree
     */
    constructor(degree) {
        super(degree);

        /**
         * @type {string}
         */
        this.name = degree.get('name');

    }

    static get schema() {
        return {
            title: 'DegreeSchema',
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
