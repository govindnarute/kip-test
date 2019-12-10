import { PaginationDto } from './../../base/PaginationDto';
import { LocationDto } from './LocationDto';

/**
 * @extends BaseDto
 */
export class LocationsDto {
    /**
     * @param {array} locations
     * @param {object} pagination
     */
    constructor(locations, pagination) {

        /**
         * @type {object}
         */
        if(locations.length) {
            this.data = locations.map(comment => new LocationDto(comment));
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
            title: 'LocationsSchema',
            type: 'object',
            required: [
                'data',
                'pagination'
            ],
            properties: {
                data: {
                    type: 'array',
                    items: LocationDto.schema
                },
                pagination: PaginationDto.schema,
            }
        };
    }
}
