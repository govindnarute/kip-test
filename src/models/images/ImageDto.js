import config from 'config';
import { BaseDto } from './../../base/BaseDto';

/**
 * @extends BaseDto
 */
export class ImageDto extends BaseDto {
    /**
     * @param {object} image
     */
    constructor(image) {
        super(image);

        /**
         * @type {number}
         */
        this.authorId = image.get('authorId');

        /**
         * @type {string}
         */
        this.name = image.get('name');

        /**
         * @type {number}
         */
        this.status = image.get('status');
    }

    static linkByAuthorIdAndName(authorId, name) {
        if (!authorId || !name) {
            return null;
        }

        return `${config.get('s3').domain}/${config.get('s3').bucket}/images/user_${authorId}/${name}`;
    }

    static link(image) {
        if (!image) {
            return null;
        }

        return this.linkByAuthorIdAndName(image.get('authorId'), image.get('name'));
    }

    static get schema() {
        return {
            title: 'ImageSchema',
            type: 'object',
            allOf: [
                super.schema,
                {
                    type: 'object',
                    required: [
                        'authorId',
                        'name',
                        'status'
                    ],
                    properties: {
                        authorId: {
                            type: 'number',
                        },
                        name: {
                            type: 'string',
                        },
                        status: {
                            type: 'number',
                        }
                    }
                }
            ]
        };
    }
}
