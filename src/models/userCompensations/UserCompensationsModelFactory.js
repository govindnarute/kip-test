import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} UserCompensationsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<UserCompensationsInstanceAttributes>} UserCompensationsInstance
 */

/**
 * @typedef {sequelize.Model<UserCompensationsInstance>} UserCompensationsModel
 */

export class UserCompensationsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UserCompensationsModel}
     */
    static define(sequelize) {
        /**
         * @type {UserCompensationsModel}
         */
        return sequelize.define(
            'UserCompensations',
            ModelDefinitionBuilder.properties({

                userId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                isCompensationRequire: {
                    type: sequelize.Sequelize.BOOLEAN,
                    allowNull: false,
                    default: false
                },

                hideCompensation: {
                    type: sequelize.Sequelize.BOOLEAN,
                    allowNull: false,
                    default: false
                },

                rate: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                    default: 0
                },

                notes: {
                    type: sequelize.Sequelize.STRING,
                    allowNull: true,
                },

            }),
            Object.assign(ModelDefinitionBuilder.options('userCompensations'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                }),
            })
        );
    }
}
