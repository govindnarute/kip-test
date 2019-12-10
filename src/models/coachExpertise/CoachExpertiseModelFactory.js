import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

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

export class CoachExpertiseModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CoachExpertiseModel}
     */
    static define(sequelize) {
        /**
         * @type {CoachExpertiseModel}
         */
        return sequelize.define(
            'CoachExpertise',
            ModelDefinitionBuilder.properties({

                userCoachId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                expertiseId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

            }),
            Object.assign(ModelDefinitionBuilder.options('coachExpertise'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                }),
            })
        );
    }
}
