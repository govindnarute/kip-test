import { Op } from 'sequelize';
import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} SchoolsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<UsersImagesInstanceAttributes>} SchoolsInstance
 */

/**
 * @typedef {sequelize.Model<SchoolsInstance>} SchoolsModel
 */

export class SchoolsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {SchoolsModel}
     */
    static define(sequelize) {
        /**
         * @type {SchoolsModel}
         */
        return sequelize.define(
            'School',
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
            Object.assign(ModelDefinitionBuilder.options('schools'), {
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
