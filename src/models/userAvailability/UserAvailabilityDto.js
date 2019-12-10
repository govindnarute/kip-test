import { BaseDto } from './../../base/BaseDto';
import { AutocompleteDto } from '../autocomplete/AutocompleteDto';
import { userAvailabilityTypes } from '../../resources/users/UserTypes';

/**
 * @extends BaseDto
 */
export class UserAvailabilityDto extends BaseDto {
    /**
     * @param {UserAvailabilityInstance} userAvailability
     */
    constructor(userAvailability) {
        super(userAvailability);

        /**
         * @type {integer}
         */
        this.connections = UserAvailabilityDto.connectionsModel(userAvailability.get('connections'));

        /**
         * @type {string}
         */
        this.availableFor = UserAvailabilityDto.availableForModel(userAvailability.get('availableFor'));
    }

    static connectionsModel(number) {
        return number === null ? null : number;
    }

    static availableForModel(id) {
        if (!id) {
            return null;
        }

        const availabilityType = userAvailabilityTypes.filter(item => item.id === id);
        return {
            id,
            name: availabilityType[0].name
        };
    }

    static get schema() {
        return {
            title: 'UserCompensationsSchema',
            type: 'object',
            nullable: true,
            allOf: [
                super.schema,
                {
                    type: 'object',
                    required: [
                    ],
                    properties: {
                        connections: {
                            type: ['number', 'null'],
                            example: 10
                        },
                        availableFor: AutocompleteDto.schema
                    }
                }
            ]
        };
    }
}
