import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';
import { ImageStatus } from '../../resources/images';

/**
 * @typedef {Object} ImagesInstanceAttributes
 * @property {number} id
 * @property {number} authorId
 * @property {string} name
 * @property {number} status
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<ImagesInstanceAttributes>} ImagesInstance
 */

/**
 * @typedef {sequelize.Model<ImagesInstance, ImagesInstanceAttributes>} ImagesModel
 */

export class ImagesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ImagesModel}
     */
    static define(sequelize) {
        /**
         * @type {ImagesModel}
         */
        return sequelize.define(
            'Image',
            ModelDefinitionBuilder.properties({
                authorId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },
                name: {
                    type: sequelize.Sequelize.STRING(255),
                    allowNull: false,
                },
                status: {
                    type: sequelize.Sequelize.TINYINT,
                    defaultValue: ImageStatus.Pending,
                    allowNull: false,
                },
            }),
            Object.assign(ModelDefinitionBuilder.options('images'), {
                scopes: {
                    byStatus:  status => ({
                        where: {
                            status,
                        }
                    }),
                }
            })
        );
    }
}
