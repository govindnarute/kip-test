'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProfessionalIndustriesModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} ProfessionalIndustriesInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<ProfessionalIndustriesInstanceAttributes>} ProfessionalIndustriesInstance
 */

/**
 * @typedef {sequelize.Model<ProfessionalIndustriesInstance>} ProfessionalIndustriesModel
 */

class ProfessionalIndustriesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ProfessionalIndustriesModel}
     */
    static define(sequelize) {
        /**
         * @type {ProfessionalIndustriesModel}
         */
        return sequelize.define('ProfessionalIndustry', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userProfessionalId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },

            industryId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('professionalIndustries'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {})
        }));
    }
}
exports.ProfessionalIndustriesModelFactory = ProfessionalIndustriesModelFactory;
//# sourceMappingURL=ProfessionalIndustriesModelFactory.js.map