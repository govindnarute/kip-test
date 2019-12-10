import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

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

export class ProfessionalIndustriesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ProfessionalIndustriesModel}
     */
    static define(sequelize) {
        /**
         * @type {ProfessionalIndustriesModel}
         */
        return sequelize.define(
            'ProfessionalIndustry',
            ModelDefinitionBuilder.properties({

                userProfessionalId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                industryId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

            }),
            Object.assign(ModelDefinitionBuilder.options('professionalIndustries'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                }),
            })
        );
    }
}
