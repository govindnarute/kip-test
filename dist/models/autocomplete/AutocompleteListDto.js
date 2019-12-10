'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutocompleteListDto = undefined;

var _PaginationDto = require('./../../base/PaginationDto');

var _AutocompleteDto = require('./AutocompleteDto');

/**
 * @extends BaseDto
 */
class AutocompleteListDto {
    /**
     * @param {array} data
     * @param {object} pagination
     */
    constructor(data, pagination) {
        /**
         * @type {object}
         */
        if (data.length) {
            this.data = data.map(item => _AutocompleteDto.AutocompleteDto.model(item));
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
            title: 'AutocompleteSchema',
            type: 'object',
            required: ['data', 'pagination'],
            properties: {
                data: {
                    type: 'array',
                    items: _AutocompleteDto.AutocompleteDto.schema
                },
                pagination: _PaginationDto.PaginationDto.schema
            }
        };
    }
}
exports.AutocompleteListDto = AutocompleteListDto;
//# sourceMappingURL=AutocompleteListDto.js.map