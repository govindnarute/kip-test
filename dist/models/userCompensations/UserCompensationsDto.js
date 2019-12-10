'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserCompensationsDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

/**
 * @extends BaseDto
 */
class UserCompensationsDto extends _BaseDto.BaseDto {
    /**
     * @param {UserCompensationsInstance} userCompensation
     */
    constructor(userCompensation) {
        super(userCompensation);

        /**
         * @type {boolean}
         */
        this.isCompensationRequire = userCompensation.get('isCompensationRequire');

        /**
         * @type {boolean}
         */
        this.hideCompensation = userCompensation.get('hideCompensation');

        /**
         * @type {number}
         */
        this.rate = userCompensation.get('rate') || null;

        /**
         * @type {string}
         */
        this.notes = userCompensation.get('notes');
    }

    static get schema() {
        return {
            title: 'UserCompensationsSchema',
            type: 'object',
            nullable: true,
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    isCompensationRequire: {
                        type: 'boolean',
                        default: false
                    },
                    hideCompensation: {
                        type: 'boolean',
                        default: false
                    },
                    rate: {
                        type: 'number',
                        nullable: true,
                        example: 100
                    },
                    notes: {
                        type: 'string'
                    }
                }
            }]
        };
    }
}
exports.UserCompensationsDto = UserCompensationsDto;
//# sourceMappingURL=UserCompensationsDto.js.map