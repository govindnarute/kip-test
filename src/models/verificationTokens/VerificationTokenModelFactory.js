import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';
import { tokenTypes } from '../../resources/users';

/**
 * @typedef {Object} VerificationTokenInstanceAttributes
 * @property {number} id
 * @property {string} token
 * @property {number} type
 * @property {number} attempt
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<VerificationTokenInstanceAttributes>} VerificationTokenInstance
 */

/**
 * @typedef {sequelize.Model<VerificationTokenInstance, VerificationTokenInstanceAttributes>} VerificationTokenModel
 */

export class VerificationTokenModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {VerificationTokenModel}
     */
    static define(sequelize) {
        /**
         * @type {VerificationTokenModel}
         */
        return sequelize.define(
            'VerificationToken',
            ModelDefinitionBuilder.properties({
                userId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                type: {
                    type: sequelize.Sequelize.TINYINT,
                    defaultValue: tokenTypes.verification,
                    allowNull: false,
                },

                isUsed: {
                    type: sequelize.Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                },

                attempt: {
                    type: sequelize.Sequelize.TINYINT,
                    defaultValue: 0,
                    allowNull: false,
                },

                token: {
                    type: sequelize.Sequelize.STRING(255),
                    allowNull: false,
                },
            }),
            Object.assign(ModelDefinitionBuilder.options('verificationTokens'), {
                scopes: {
                    byType:  type => ({
                        where: {
                            type,
                        }
                    }),
                    byUser: userId => ({
                        where: {
                            userId,
                        }
                    })
                }
            })
        );
    }
}
