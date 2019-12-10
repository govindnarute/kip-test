import { ImageDto } from '../images';

export class ProviderDto {

    constructor(user) {
        /**
         * @type {number}
         */
        this.id = user["id"];

        /**
         * @type {string}
         */
        this.firstName = user["firstName"];

        /**
         * @type {string}
         */
        this.lastName = user["lastName"];

        /**
         * @type {string}
         */
        this.headline = user["headline"];

        /**
         * @type {string}
         */
        this.summary = user["summary"];

        /**
         * @type {string}
         */
        this.avatar = user["avatar"] && ImageDto.linkByAuthorIdAndName(this.id, user["avatar"]);


        /**
         * @type {string}
         */
        this.industries = user["industries"] ? user["industries"] : [];

        /**
         * @type {string}
         */
        this.location = user["location"];
    }

    static get schema() {
        return {
            title: 'ProviderDto',
            type: 'object',
            allOf: [
                {
                    type: 'object',
                    required: [
                    ],
                    properties: {
                        id: {
                            type: "number"
                        },
                        firstName: {
                            type: 'string',
                            example: 'User First Name'
                        },
                        lastName: {
                            type: 'string',
                            example: 'User Last Name'
                        },
                        summary: {
                            type: 'string',
                        },
                        avatar: {
                            type: 'string',
                        },
                        industries: {
                            type: "array",
                            items: {
                                type: 'string'
                            }
                        },
                        location: {
                            type: "string"
                        },
                        headline: {
                            type: "string"
                        }
                    }
                }
            ]
        };
    }
}
