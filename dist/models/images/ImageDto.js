'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageDto = undefined;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _BaseDto = require('./../../base/BaseDto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends BaseDto
 */
class ImageDto extends _BaseDto.BaseDto {
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

        return `${_config2.default.get('s3').domain}/${_config2.default.get('s3').bucket}/images/user_${authorId}/${name}`;
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
            allOf: [super.schema, {
                type: 'object',
                required: ['authorId', 'name', 'status'],
                properties: {
                    authorId: {
                        type: 'number'
                    },
                    name: {
                        type: 'string'
                    },
                    status: {
                        type: 'number'
                    }
                }
            }]
        };
    }
}
exports.ImageDto = ImageDto;
//# sourceMappingURL=ImageDto.js.map