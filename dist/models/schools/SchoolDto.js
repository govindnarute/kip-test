'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SchoolDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

/**
 * @extends BaseDto
 */
class SchoolDto extends _BaseDto.BaseDto {
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
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    name: {
                        type: 'string'
                    }
                }
            }]
        };
    }
}
exports.SchoolDto = SchoolDto;
//# sourceMappingURL=SchoolDto.js.map