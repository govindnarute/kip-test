import { PaginationDto } from './../../base/PaginationDto';
import { UserDto } from './UserDto';

export class UsersDto {
    /**
     * @param {array} users
     * @param {object} pagination
     */
    constructor(users, pagination) {

        /**
         * @type {object}
         */
        if(users.length) {
            this.data = users.map(user => new UserDto(user));
        } else {
            this.data = [];
        }

        /**
         * @type {object}
         */
        this.pagination = new PaginationDto(pagination);
    }

    static get schema() {
        return {
            title: 'UsersSchema',
            type: 'object',
            required: [
                'data',
                'pagination'
            ],
            properties: {
                data: {
                    type: 'array',
                    items: UserDto.schema
                },
                pagination: PaginationDto.schema,
            }
        };
    }
}
