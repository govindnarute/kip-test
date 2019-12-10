'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoachExpertiseModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} CoachExpertiseInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<CoachExpertiseInstanceAttributes>} CoachExpertiseInstance
 */

/**
 * @typedef {sequelize.Model<CoachExpertiseInstance>} CoachExpertiseModel
 */

class CoachExpertiseModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CoachExpertiseModel}
     */
    static define(sequelize) {
        /**
         * @type {CoachExpertiseModel}
         */
        return sequelize.define('CoachExpertise', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userCoachId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },

            expertiseId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('coachExpertise'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {})
        }));
    }
}
exports.CoachExpertiseModelFactory = CoachExpertiseModelFactory;
//# sourceMappingURL=CoachExpertiseModelFactory.js.map