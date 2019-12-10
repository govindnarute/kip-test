'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _ImageDto = require('../models/images/ImageDto');

var _AwsMetaDto = require('../models/images/AwsMetaDto');

var _ImageAwsMetaDto = require('../models/images/ImageAwsMetaDto');

var _EmptyDto = require('../base/EmptyDto');

var _http = require('../utils/http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImagesController {
    constructor({ config, S3Service, ImagesService }) {
        this.config = config;
        this.s3Service = S3Service;
        this.imagesService = ImagesService;
    }

    /**
     * Prepare load url
     * @param {e.Request} request
     * @returns {Promise.<ImageAwsMetaDto>}
     */
    async prepareLoadUrl(request) {
        const acl = 'public-read';
        const fileName = `${this.config.get('s3.imagePrefix')}${_uuid2.default.v4()}.${request.body.contentType.split('/')[1]}`;
        const key = `images/user_${request.user.userId}/${fileName}`;

        const awsResponse = await this.s3Service.createPresignedPost(key, request.body.contentType, acl);
        const image = await this.imagesService.createImageInDb(request.user.userId, fileName);

        return new _ImageAwsMetaDto.ImageAwsMetaDto(new _ImageDto.ImageDto(image), new _AwsMetaDto.AwsMetaDto(awsResponse, key, acl, request.body.contentType));
    }

    /**
     * Update status
     * @param {e.Request} request
     * @returns {Promise.<EmptyDto>}
     */
    async updateStatus(request) {
        const image = await await this.imagesService.getImageById(request.params.imageId);

        if (!image) {
            throw new _http.NotFoundError('IMAGE_NOT_FOUND');
        }

        if (image && image.authorId !== request.user.userId) {
            throw new _http.ForbiddenError('WITHOUT_ACCESS_TO_IMAGE');
        }

        await image.update(request.body);

        return new _EmptyDto.EmptyDto();
    }
}
exports.default = ImagesController;
//# sourceMappingURL=ImagesController.js.map