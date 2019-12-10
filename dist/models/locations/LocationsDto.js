'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocationsDto = undefined;

var _PaginationDto = require('./../../base/PaginationDto');

var _LocationDto = require('./LocationDto');

/**
 * @extends BaseDto
 */
class LocationsDto {
    /**
     * @param {array} locations
     * @param {object} pagination
     */
    constructor(locations, pagination) {

        /**
         * @type {object}
         */
        if (locations.length) {
            this.data = locations.map(comment => new _LocationDto.LocationDto(comment));
        } else {
            this.data = [];
        }

        /**
         * @type {object}
         */
        this.pagination = new _PaginationDto.PaginationDto(pagination);
    }

    static get schema() {
        return {
            title: 'LocationsSchema',
            type: 'object',
            required: ['data', 'pagination'],
            properties: {
                data: {
                    type: 'array',
                    items: _LocationDto.LocationDto.schema
                },
                pagination: _PaginationDto.PaginationDto.schema
            }
        };
    }
}
exports.LocationsDto = LocationsDto;
//# sourceMappingURL=LocationsDto.js.map