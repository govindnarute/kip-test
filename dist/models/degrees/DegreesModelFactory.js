'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DegreesModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

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

class DegreesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {DegreesModel}
     */
    static define(sequelize) {
        /**
         * @type {DegreesModel}
         */
        return sequelize.define('Degree', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('degrees'), {
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
exports.DegreesModelFactory = DegreesModelFactory;
//# sourceMappingURL=DegreesModelFactory.js.map