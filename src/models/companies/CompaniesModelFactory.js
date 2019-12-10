import { Op } from 'sequelize';
import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} CompaniesInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<CompaniesInstanceAttributes>} CompaniesInstance
 */

/**
 * @typedef {sequelize.Model<CompaniesInstance>} CompaniesModel
 */

export class CompaniesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CompaniesModel}
     */
    static define(sequelize) {
        /**
         * @type {CompaniesModel}
         */
        return sequelize.define(
            'Company',
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
            Object.assign(ModelDefinitionBuilder.options('companies'), {
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
