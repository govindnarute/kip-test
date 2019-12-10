'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('../../utils/http');

var _images = require('../../resources/images');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImagesService {
    constructor({ config, DBConnection }) {
        this.config = config;
        this.Image = DBConnection.model('Image');
        this.UsersImage = DBConnection.model('UsersImage');
    }

    /**
     * Check image creator
     * @param request
     * @param response
     * @param next
     * @returns {function(*, *, *)}
     */
    async checkUploadedImageForUse(request, response, next) {
        const image = await this.Image.scope({ method: ['byStatus', _images.ImageStatus.Loaded] }).findByPk(request.body.imageId);

        if (!image) {
            return next(new _http.NotFoundError('IMAGE_NOT_FOUND'));
        }

        if (image && image.authorId !== request.user.userId) {
            return next(new _http.ForbiddenError('WITHOUT_ACCESS_TO_IMAGE'));
        }
        next();
    }

    /**
     * Add avatar to user
     * @param {array} userImages
     * @param {number} imageId
     * @param {number} userId
     * @returns {Promise.<void>}
     */
    async addAvatar(userImages, imageId, userId) {
        if (userImages) {
            await userImages.update({ imageId });
            return;
        }

        await this.UsersImage.create({
            userId,
            imageId
        });
    }

    async createImage(resFetch) {
        return new Promise(resolve => {
            const mime = resFetch.headers.get('content-type');
            const mimetype = mime.split('/')[1];
            const newFileName = `${this.config.get('s3.imagePrefix')}${_uuid2.default.v4()}`;
            const createStream = _fs2.default.createWriteStream(__dirname + `/../../../temp/${newFileName}.${mimetype}`);
            resFetch.body.pipe(createStream);
            createStream.on('close', () => {
                resolve({
                    path: _path2.default.resolve(__dirname, `/../../../temp/${newFileName}.${mimetype}`),
                    mime,
                    name: `${newFileName}.${mimetype}`
                });
            });
        });
    }

    /**
     * Create image in DB
     * @param authorId
     * @param name
     * @returns {Promise.<void>}
     */
    async createImageInDb(authorId, name) {
        return this.Image.create({
            authorId,
            name
        });
    }

    /**
     * Get image by id
     * @param imageId
     * @returns {Promise.<Promise.<Model>|Bluebird<any | TInstance>>}
     */
    async getImageById(imageId) {
        return this.Image.findByPk(imageId);
    }

}
exports.default = ImagesService;
//# sourceMappingURL=ImagesService.js.map