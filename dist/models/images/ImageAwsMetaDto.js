'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageAwsMetaDto = undefined;

var _ImageDto = require('./ImageDto');

var _AwsMetaDto = require('./AwsMetaDto');

class ImageAwsMetaDto {

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
            required: ['data', 'meta'],
            properties: {
                data: _ImageDto.ImageDto.schema,
                meta: _AwsMetaDto.AwsMetaDto.schema
            }
        };
    }
}
exports.ImageAwsMetaDto = ImageAwsMetaDto;
//# sourceMappingURL=ImageAwsMetaDto.js.map