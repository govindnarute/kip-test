'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class PaginationDto {
    /**
     * @param {object} pagination
     */
    constructor(pagination) {

        /**
         * @type {number}
         */
        this.nextOffset = pagination.nextOffset;

        /**
         * @type {number}
         */
        this.nextPage = pagination.nextPage;

        /**
         * @type {number}
         */
        this.totalCount = pagination.totalCount;
    }

    static get schema() {
        return {
            type: 'object',
            required: ['nextOffset', 'nextPage', 'totalCount'],
            properties: {
                nextOffset: {
                    type: 'integer',
                    description: 'Next offset'
                },
                nextPage: {
                    type: 'integer',
                    description: 'Next page'
                },
                totalCount: {
                    type: 'integer',
                    description: 'Total amount of records'
                }
            }
        };
    }
}
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=PaginationDto.js.map