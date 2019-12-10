'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SchoolsModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

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

class SchoolsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {SchoolsModel}
     */
    static define(sequelize) {
        /**
         * @type {SchoolsModel}
         */
        return sequelize.define('School', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('schools'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {
                search: q => ({
                    where: {
                        name: {
                            [_sequelize.Op.like]: `%${q}%`
                        }
                    }
                }),
                byIds: (ids = []) => ({
                    where: {
                        id: {
                            [_sequelize.Op.in]: ids
                        }
                    }
                }),
                onlyForShow: () => ({
                    where: {
                        isShown: true
                    }
                })
            })
        }));
    }
}
exports.SchoolsModelFactory = SchoolsModelFactory;
//# sourceMappingURL=SchoolsModelFactory.js.map