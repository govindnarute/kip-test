export default class UsersImagesService {
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
