import { Op } from 'sequelize';
import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} DegreesInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<DegreesInstanceAttributes>} DegreesInstance
 */

/**
 * @typedef {sequelize.Model<DegreesInstance>} DegreesModel
 */

export class DegreesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {DegreesModel}
     */
    static define(sequelize) {
        /**
         * @type {DegreesModel}
         */
        return sequelize.define(
            'Degree',
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
            Object.assign(ModelDefinitionBuilder.options('degrees'), {
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
