'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SocialsModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} SocialsInstanceAttributes
 * @property {number} id
 * @property {number} userId
 * @property {number} type
 * @property {string} socialUserId
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<SocialsInstanceAttributes>} SocialsInstance
 */

/**
 * @typedef {sequelize.Model<SocialsInstance, SocialsInstanceAttributes>} SocialsModel
 */

class SocialsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {SocialsModel}
     */
    static define(sequelize) {
        /**
         * @type {SocialsModel}
         */
        const Social = sequelize.define('Social', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },
            type: {
                type: sequelize.Sequelize.TINYINT,
                allowNull: false
            },
            socialUserId: {
                type: sequelize.Sequelize.STRING(255),
                allowNull: false
            }
        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('socials'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {
                byType: type => ({
                    where: {
                        type
                    }
                }),
                bySocialUserId: socialUserId => ({
                    where: {
                        socialUserId
                    }
                }),
                withUser: () => ({
                    include: [{
                        model: sequelize.model('User'),
                        as: 'user'
                    }]
                })
            })
        }));

        Social.associate = function () {
            this.belongsTo(sequelize.model('User'), {
                foreignKey: 'userId',
                as: 'user'
            });
        };

        return Social;
    }
}
exports.SocialsModelFactory = SocialsModelFactory;
//# sourceMappingURL=SocialsModelFactory.js.map