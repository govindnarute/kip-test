'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UsersImageModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

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

class UsersImageModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UsersImagesModel}
     */
    static define(sequelize) {
        /**
         * @type {UsersImagesModel}
         */
        return sequelize.define('UsersImage', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },
            imageId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            }
        }), _ModelDefinitionBuilder.ModelDefinitionBuilder.options('usersImages'));
    }
}
exports.UsersImageModelFactory = UsersImageModelFactory;
//# sourceMappingURL=UsersImageModelFactory.js.map