import { Op } from 'sequelize';
import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} FieldOfStudyInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<FieldOfStudyInstanceAttributes>} FieldOfStudyInstance
 */

/**
 * @typedef {sequelize.Model<FieldOfStudyInstance>} FieldOfStudyModel
 */

export class FieldOfStudyModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {FieldOfStudyModel}
     */
    static define(sequelize) {
        /**
         * @type {FieldOfStudyModel}
         */
        return sequelize.define(
            'FieldOfStudy',
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
            Object.assign(ModelDefinitionBuilder.options('fieldsOfStudy'), {
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
