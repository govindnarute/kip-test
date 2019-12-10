'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserAvailabilityModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

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

class UserAvailabilityModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UserAvailabilityModel}
     */
    static define(sequelize) {
        /**
         * @type {UserAvailabilityModel}
         */
        return sequelize.define('UserAvailability', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },

            connections: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true
            },

            availableFor: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('userAvailability'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {})
        }));
    }
}
exports.UserAvailabilityModelFactory = UserAvailabilityModelFactory;
//# sourceMappingURL=UserAvailabilityModelFactory.js.map