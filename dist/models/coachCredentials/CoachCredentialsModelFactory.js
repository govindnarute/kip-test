'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoachCredentialsModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} CoachCredentialsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<CoachCredentialsInstanceAttributes>} CoachCredentialsInstance
 */

/**
 * @typedef {sequelize.Model<CoachCredentialsInstance>} CoachCredentialsModel
 */

class CoachCredentialsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CoachCredentialsModel}
     */
    static define(sequelize) {
        /**
         * @type {CoachCredentialsModel}
         */
        return sequelize.define('CoachCredential', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userCoachId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },

            credentialId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('coachCredentials'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {})
        }));
    }
}
exports.CoachCredentialsModelFactory = CoachCredentialsModelFactory;
//# sourceMappingURL=CoachCredentialsModelFactory.js.map