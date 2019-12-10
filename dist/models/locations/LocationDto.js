'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocationDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

/**
 * @extends BaseDto
 */
class LocationDto extends _BaseDto.BaseDto {
    /**
     * @param {array} locations
     */
    constructor(locations) {
        super(locations);

        /**
         * @type {string}
         */
        this.name = locations.get('name');
    }

    static location(locations) {
        if (!locations) {
            return null;
        }

        return {
            id: locations.get('id'),
            name: locations.get('name')
        };
    }

    static get locationBaseSchema() {
        return {
            title: 'LocationBaseSchema',
            type: 'object',
            nullable: true,
            required: [],
            properties: {
                id: {
                    type: 'number'
                },
                name: {
                    type: 'string'
                }
            }
        };
    }

    static get schema() {
        return {
            title: 'LocationSchema',
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
exports.LocationDto = LocationDto;
//# sourceMappingURL=LocationDto.js.map