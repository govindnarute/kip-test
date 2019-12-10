import { PaginationDto } from './../../base/PaginationDto';
import { AutocompleteDto } from './AutocompleteDto';

/**
 * @extends BaseDto
 */
export class AutocompleteListDto {
    /**
     * @param {array} data
     * @param {object} pagination
     */
    constructor(data, pagination) {
        /**
         * @type {object}
         */
        if(data.length) {
            this.data = data.map(item => AutocompleteDto.model(item));
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
            title: 'AutocompleteSchema',
            type: 'object',
            required: [
                'data',
                'pagination'
            ],
            properties: {
                data: {
                    type: 'array',
                    items: AutocompleteDto.schema
                },
                pagination: PaginationDto.schema,
            }
        };
    }
}
