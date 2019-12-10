'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FieldOfStudyModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

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

class FieldOfStudyModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {FieldOfStudyModel}
     */
    static define(sequelize) {
        /**
         * @type {FieldOfStudyModel}
         */
        return sequelize.define('FieldOfStudy', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('fieldsOfStudy'), {
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
exports.FieldOfStudyModelFactory = FieldOfStudyModelFactory;
//# sourceMappingURL=FieldOfStudyModelFactory.js.map