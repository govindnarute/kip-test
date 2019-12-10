'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

var _images = require('../images');

var _locations = require('../locations');

var _MaskHelper = require('../../helpers/MaskHelper');

var _UserIdentityDto = require('./UserIdentityDto');

/**
 * @extends BaseDto
 */
class UserDto extends _BaseDto.BaseDto {
    /**
     * @param {UserInstance} user
     */
    constructor(user) {
        super(user);

        /**
         * @type {string}
         */
        this.firstName = user.get('firstName');

        /**
         * @type {string}
         */
        this.lastName = user.get('lastName');

        /**
         * @type {string}
         */
        this.email = user.get('email');

        /**
         * @type {number}
         */
        this.type = user.get('type');

        /**
         * @type {boolean}
         */
        this.isVerified = user.get('isVerified');

        /**
         * @type {string}
         */
        this.headline = user.get('headline');

        /**
         * @type {string}
         */
        this.summary = user.get('summary');

        /**
         * @type {string}
         */
        this.location = _locations.LocationDto.location(user.get('location'));

        /**
         * @type {Object}
         */
        this.identities = _MaskHelper.MaskHelper.parseMaskToFlags(user.get('identities'));

        /**
         * @type {string}
         */
        this.avatar = user.get('avatar') && _images.ImageDto.link(user.get('avatar')[0]);

        /**
         * @type {boolean}
         */
        this.isFirstEnter = user.get('isFirstEnter');
    }

    static get schema() {
        return {
            title: 'UserSchema',
            type: 'object',
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    firstName: {
                        type: 'string',
                        example: 'User First Name'
                    },
                    lastName: {
                        type: 'string',
                        example: 'User Last Name'
                    },
                    email: {
                        type: 'string',
                        example: 'user@example.com'
                    },
                    type: {
                        type: 'number',
                        example: 1
                    },
                    isVerified: {
                        type: 'boolean',
                        default: false
                    },
                    headline: {
                        type: 'string'
                    },
                    summary: {
                        type: 'string'
                    },
                    isFirstEnter: {
                        type: 'boolean',
                        default: true
                    },
                    location: _locations.LocationDto.locationBaseSchema,
                    identities: _UserIdentityDto.UserIdentityDto.schema,
                    avatar: {
                        type: 'string'
                    }
                }
            }]
        };
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=UserDto.js.map