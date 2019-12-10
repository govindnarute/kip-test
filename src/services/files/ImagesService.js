import uuid from 'uuid';
import fs from 'fs';
import path from 'path';

import { NotFoundError, ForbiddenError } from '../../utils/http';
import { ImageStatus } from '../../resources/images';

export default class ImagesService {
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
        const image = await this.Image
            .scope({ method: ['byStatus', ImageStatus.Loaded] })
            .findByPk(request.body.imageId);

        if (!image) {
            return next(new NotFoundError('IMAGE_NOT_FOUND'));
        }

        if (image && image.authorId !== request.user.userId) {
            return next(new ForbiddenError('WITHOUT_ACCESS_TO_IMAGE'));
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
        return new Promise((resolve) => {
            const mime = resFetch.headers.get('content-type');
            const mimetype = mime.split('/')[1];
            const newFileName = `${this.config.get('s3.imagePrefix')}${uuid.v4()}`;
            const createStream = fs.createWriteStream(__dirname + `/../../../temp/${newFileName}.${mimetype}`);
            resFetch.body.pipe(createStream);
            createStream.on('close', () => {
                resolve({
                    path: path.resolve(__dirname, `/../../../temp/${newFileName}.${mimetype}`),
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
