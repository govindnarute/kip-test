import fs from 'fs';
import path from 'path';
import util from 'util';

export default class AvatarService {

    constructor({ S3Service }) {
        this.S3 = S3Service;
    }

    /**
     * Add avatars to S3
     * @param image
     * @param id
     * @returns {Promise.<void>}
     */
    async addAvatarToS3(image, id) {
        const filePath = path.resolve(__dirname + '/../../../temp', `${image.name}`);
        const s3Path = `images/user_${id}/${image.name}`;
        return this.S3.uploadFile(filePath, image.type, s3Path);
    }

    /**
     * Delete temporary avatar files
     * @param image
     * @returns {Promise.<void>}
     */
    async deleteTemporaryAvatarFile(image) {
        const deleteFileAsync = util.promisify(fs.unlink);
        const pathFile = path.resolve(__dirname + '/../../../temp', `${image.name}`);
        return deleteFileAsync(pathFile);
    }

}
