'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class UsersImagesService {
    constructor({ DBConnection }) {
        this.UsersImage = DBConnection.model('UsersImage');
    }

    /**
     * Get all by user
     * @param userId
     * @returns {Promise.<void>}
     */
    async getByUser(userId) {
        return this.UsersImage.findOne({ where: { userId } });
    }
}
exports.default = UsersImagesService;
//# sourceMappingURL=UsersImagesService.js.map