'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FieldOfStudyDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

/**
 * @extends BaseDto
 */
class FieldOfStudyDto extends _BaseDto.BaseDto {
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
exports.FieldOfStudyDto = FieldOfStudyDto;
//# sourceMappingURL=FieldOfStudyDto.js.map