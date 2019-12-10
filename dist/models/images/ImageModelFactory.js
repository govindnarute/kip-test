'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImagesModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

var _images = require('../../resources/images');

/**
 * @typedef {Object} ImagesInstanceAttributes
 * @property {number} id
 * @property {number} authorId
 * @property {string} name
 * @property {number} status
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<ImagesInstanceAttributes>} ImagesInstance
 */

/**
 * @typedef {sequelize.Model<ImagesInstance, ImagesInstanceAttributes>} ImagesModel
 */

class ImagesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ImagesModel}
     */
    static define(sequelize) {
        /**
         * @type {ImagesModel}
         */
        return sequelize.define('Image', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({
            authorId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },
            name: {
                type: sequelize.Sequelize.STRING(255),
                allowNull: false
            },
            status: {
                type: sequelize.Sequelize.TINYINT,
                defaultValue: _images.ImageStatus.Pending,
                allowNull: false
            }
        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('images'), {
            scopes: {
                byStatus: status => ({
                    where: {
                        status
                    }
                })
            }
        }));
    }
}
exports.ImagesModelFactory = ImagesModelFactory;
//# sourceMappingURL=ImageModelFactory.js.map