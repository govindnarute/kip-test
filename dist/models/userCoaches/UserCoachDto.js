'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserCoachDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

var _autocomplete = require('../autocomplete');

/**
 * @extends BaseDto
 */
class UserCoachDto extends _BaseDto.BaseDto {
    /**
     * @param {UserCoachInstance} userCoach
     */
    constructor(userCoach) {
        super(userCoach);
        /**
         * @type {number}
         */
        this.yearOfExperience = userCoach.get('yearOfExperience');

        /**
         * @type {number}
         */
        this.expertise = _autocomplete.AutocompleteDto.arrayModel(userCoach.get('expertise'));

        /**
         * @type {number}
         */
        this.credential = _autocomplete.AutocompleteDto.arrayModel(userCoach.get('credential'));
    }

    static get schema() {
        return {
            title: 'UserProfessionalSchema',
            type: 'object',
            nullable: true,
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    yearOfExperience: {
                        type: 'number',
                        example: 1
                    },
                    expertise: {
                        type: 'array',
                        items: _autocomplete.AutocompleteDto.schema
                    },
                    credential: {
                        type: 'array',
                        items: _autocomplete.AutocompleteDto.schema
                    }
                }
            }]
        };
    }
}
exports.UserCoachDto = UserCoachDto;
//# sourceMappingURL=UserCoachDto.js.map