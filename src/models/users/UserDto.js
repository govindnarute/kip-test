import { BaseDto } from './../../base/BaseDto';
import { ImageDto } from '../images';
import { LocationDto } from '../locations';
import { MaskHelper } from '../../helpers/MaskHelper';
import { UserIdentityDto } from './UserIdentityDto';

/**
 * @extends BaseDto
 */
export class UserDto extends BaseDto {
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
        this.location =  LocationDto.location(user.get('location'));

        /**
         * @type {Object}
         */
        this.identities = MaskHelper.parseMaskToFlags(user.get('identities'));

        /**
         * @type {string}
         */
        this.avatar = user.get('avatar') && ImageDto.link(user.get('avatar')[0]);

        /**
         * @type {boolean}
         */
        this.isFirstEnter = user.get('isFirstEnter');
    }

    static get schema() {
        return {
            title: 'UserSchema',
            type: 'object',
            allOf: [
                super.schema,
                {
                    type: 'object',
                    required: [
                    ],
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
                            default: false,
                        },
                        headline: {
                            type: 'string',
                        },
                        summary: {
                            type: 'string',
                        },
                        isFirstEnter: {
                            type: 'boolean',
                            default: true,
                        },
                        location: LocationDto.locationBaseSchema,
                        identities: UserIdentityDto.schema,
                        avatar: {
                            type: 'string',
                        },
                    }
                }
            ]
        };
    }
}
