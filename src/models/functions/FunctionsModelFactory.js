import { Op } from 'sequelize';
import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} FunctionsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<FunctionsInstanceAttributes>} FunctionsInstance
 */

/**
 * @typedef {sequelize.Model<FunctionsInstance>} FunctionsModel
 */

export class FunctionsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {FunctionsModel}
     */
    static define(sequelize) {
        /**
         * @type {FunctionsModel}
         */
        return sequelize.define(
            'Function',
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
            Object.assign(ModelDefinitionBuilder.options('functions'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                    search: (q) => ({
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
