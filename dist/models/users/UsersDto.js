'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UsersDto = undefined;

var _PaginationDto = require('./../../base/PaginationDto');

var _UserDto = require('./UserDto');

class UsersDto {
    /**
     * @param {array} users
     * @param {object} pagination
     */
    constructor(users, pagination) {

        /**
         * @type {object}
         */
        if (users.length) {
            this.data = users.map(user => new _UserDto.UserDto(user));
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
            title: 'UsersSchema',
            type: 'object',
            required: ['data', 'pagination'],
            properties: {
                data: {
                    type: 'array',
                    items: _UserDto.UserDto.schema
                },
                pagination: _PaginationDto.PaginationDto.schema
            }
        };
    }
}
exports.UsersDto = UsersDto;
//# sourceMappingURL=UsersDto.js.map