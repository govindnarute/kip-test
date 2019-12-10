'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AvatarService {

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
        const filePath = _path2.default.resolve(__dirname + '/../../../temp', `${image.name}`);
        const s3Path = `images/user_${id}/${image.name}`;
        return this.S3.uploadFile(filePath, image.type, s3Path);
    }

    /**
     * Delete temporary avatar files
     * @param image
     * @returns {Promise.<void>}
     */
    async deleteTemporaryAvatarFile(image) {
        const deleteFileAsync = _util2.default.promisify(_fs2.default.unlink);
        const pathFile = _path2.default.resolve(__dirname + '/../../../temp', `${image.name}`);
        return deleteFileAsync(pathFile);
    }

}
exports.default = AvatarService;
//# sourceMappingURL=AvatarService.js.map