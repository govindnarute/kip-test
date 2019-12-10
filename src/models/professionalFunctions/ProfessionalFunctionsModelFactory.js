import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

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

export class ProfessionalFunctionsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ProfessionalFunctionsModel}
     */
    static define(sequelize) {
        /**
         * @type {ProfessionalFunctionsModel}
         */
        return sequelize.define(
            'ProfessionalFunction',
            ModelDefinitionBuilder.properties({

                userProfessionalId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                functionId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

            }),
            Object.assign(ModelDefinitionBuilder.options('professionalFunctions'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                }),
            })
        );
    }
}
