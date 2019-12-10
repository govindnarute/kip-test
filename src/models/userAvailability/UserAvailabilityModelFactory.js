import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} UserAvailabilityAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<UserAvailabilityAttributes>} UserAvailabilityInstance
 */

/**
 * @typedef {sequelize.Model<UserAvailabilityInstance>} UserAvailabilityModel
 */

export class UserAvailabilityModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UserAvailabilityModel}
     */
    static define(sequelize) {
        /**
         * @type {UserAvailabilityModel}
         */
        return sequelize.define(
            'UserAvailability',
            ModelDefinitionBuilder.properties({

                userId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                connections: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                },

                availableFor: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

            }),
            Object.assign(ModelDefinitionBuilder.options('userAvailability'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                }),
            })
        );
    }
}
