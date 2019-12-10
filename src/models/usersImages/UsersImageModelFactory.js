import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} UsersImagesInstanceAttributes
 * @property {number} id
 * @property {number} userId
 * @property {number} imageId
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<UsersImagesInstanceAttributes>} ImagesInstance
 */

/**
 * @typedef {sequelize.Model<UsersImagesInstance, UsersImagesInstanceAttributes>} ImagesModel
 */

export class UsersImageModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UsersImagesModel}
     */
    static define(sequelize) {
        /**
         * @type {UsersImagesModel}
         */
        return sequelize.define(
            'UsersImage',
            ModelDefinitionBuilder.properties({

                userId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },
                imageId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },
            }),
            ModelDefinitionBuilder.options('usersImages')
        );
    }
}
