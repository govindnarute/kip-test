'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DegreeDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

/**
 * @extends BaseDto
 */
class DegreeDto extends _BaseDto.BaseDto {
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
exports.DegreeDto = DegreeDto;
//# sourceMappingURL=DegreeDto.js.map