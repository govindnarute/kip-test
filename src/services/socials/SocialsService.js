import { ImageStatus } from '../../resources/images/imagesStatuses';
import { userTypes } from '../../resources/users/UserTypes';

export default class SocialsService {
    constructor({ DBConnection }) {
        this.dbConnection = DBConnection;
        this.Social = DBConnection.model('Social');
    }

    /**
     * Get social by type and social user id
     * @param type
     * @param socialUserId
     * @returns {Promise.<Promise.<Model>|Bluebird<any | TInstance>>}
     */
    async getSocialByTypeAndSocialUserId(type, socialUserId) {
        return this.Social.scope(
            { method: ['byType', type] },
            { method: ['bySocialUserId', socialUserId] },
            'withUser')
            .findOne();
    }

    /**
     * Add social user
     * @param socialUser
     * @param socialType
     * @param userType
     * @returns {Promise}
     */
    async addSocialUser(socialUser, socialType, userType) {
        const User = this.dbConnection.model('User');
        let user;

        if (socialUser.email) {
            user = await User.findOne({ where: { email: socialUser.email } });
            if (user) return Object.assign(user, { isNew: false });
        }

        const transaction = await this.dbConnection.transaction();

        try {
            user = await User.create({
                firstName: socialUser.firstName,
                lastName: socialUser.lastName,
                email: socialUser.email,
                type: userType ? userType : userTypes.both,
                isVerified: true,
                headline: socialUser.headline,
            }, { transaction });

            await this.Social.create({
                userId: user.id,
                type: socialType,
                socialUserId: socialUser.socialUserId
            }, { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
        return user;
    }

    /**
     * Add image
     * @param image
     * @param user
     * @returns {Promise}
     */
    async addImage(image, user) {
        const Image = this.dbConnection.model('Image');
        const UsersImage = this.dbConnection.model('UsersImage');
        const transaction = await this.dbConnection.transaction();

        try {
            const imageForSave = {
                authorId: user.id,
                name: image.name,
                status: ImageStatus.Loaded
            };
            const imageCreated = await Image.create(imageForSave, { transaction });

            const userImage = {
                imageId: imageCreated.id,
                userId: user.id,
            };
            await UsersImage.create(userImage, { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
