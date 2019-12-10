'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserAvailabilityDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

var _AutocompleteDto = require('../autocomplete/AutocompleteDto');

var _UserTypes = require('../../resources/users/UserTypes');

/**
 * @extends BaseDto
 */
class UserAvailabilityDto extends _BaseDto.BaseDto {
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

        const availabilityType = _UserTypes.userAvailabilityTypes.filter(item => item.id === id);
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
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    connections: {
                        type: ['number', 'null'],
                        example: 10
                    },
                    availableFor: _AutocompleteDto.AutocompleteDto.schema
                }
            }]
        };
    }
}
exports.UserAvailabilityDto = UserAvailabilityDto;
//# sourceMappingURL=UserAvailabilityDto.js.map