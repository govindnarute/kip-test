import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

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

export class CoachCredentialsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CoachCredentialsModel}
     */
    static define(sequelize) {
        /**
         * @type {CoachCredentialsModel}
         */
        return sequelize.define(
            'CoachCredential',
            ModelDefinitionBuilder.properties({

                userCoachId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                credentialId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

            }),
            Object.assign(ModelDefinitionBuilder.options('coachCredentials'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                }),
            })
        );
    }
}
