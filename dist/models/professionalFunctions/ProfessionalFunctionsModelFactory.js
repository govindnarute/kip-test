'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProfessionalFunctionsModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} ProfessionalFunctionsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<ProfessionalFunctionsInstanceAttributes>} ProfessionalFunctionsInstance
 */

/**
 * @typedef {sequelize.Model<ProfessionalFunctionsInstance>} ProfessionalFunctionsModel
 */

class ProfessionalFunctionsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ProfessionalFunctionsModel}
     */
    static define(sequelize) {
        /**
         * @type {ProfessionalFunctionsModel}
         */
        return sequelize.define('ProfessionalFunction', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userProfessionalId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },

            functionId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('professionalFunctions'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {})
        }));
    }
}
exports.ProfessionalFunctionsModelFactory = ProfessionalFunctionsModelFactory;
//# sourceMappingURL=ProfessionalFunctionsModelFactory.js.map