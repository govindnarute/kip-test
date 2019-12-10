import { ImageDto } from './ImageDto';
import { AwsMetaDto } from './AwsMetaDto';

export class ImageAwsMetaDto  {

    /**
     * @param {object} image
     * @param {object} awsMeta
     */
    constructor(image, awsMeta) {
        /**
         * @type {object}
         */
        this.data = image;

        /**
         * @type {object}
         */
        this.meta = awsMeta;
    }

    static get schema() {
        return {
            title: 'ImageAwsMetaSchema',
            type: 'object',
            required: [
                'data',
                'meta'
            ],
            properties: {
                data: ImageDto.schema,
                meta: AwsMetaDto.schema,
            }
        };
    }
}
