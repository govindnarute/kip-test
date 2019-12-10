import { Op } from 'sequelize';
import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} CredentialsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<CredentialsInstanceAttributes>} CredentialsInstance
 */

/**
 * @typedef {sequelize.Model<CredentialsInstance>} CredentialsModel
 */

export class CredentialsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CredentialsModel}
     */
    static define(sequelize) {
        /**
         * @type {CredentialsModel}
         */
        return sequelize.define(
            'Credential',
            ModelDefinitionBuilder.properties({

                name: {
                    type: sequelize.Sequelize.STRING(100),
                    allowNull: false,
                },

                isShown: {
                    type: sequelize.Sequelize.BOOLEAN,
                    defaultValue: true,
                    allowNull: false,
                },

            }),
            Object.assign(ModelDefinitionBuilder.options('credentials'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                    search: (q) =>({
                        where: {
                            name: {
                                [Op.like]: `%${q}%`
                            }
                        }
                    }),
                    byIds: (ids = []) => ({
                        where: {
                            id: {
                                [Op.in]: ids
                            }
                        }
                    }),
                    onlyForShow: () => ({
                        where: {
                            isShown: true
                        }
                    })
                }),
            })
        );
    }
}
