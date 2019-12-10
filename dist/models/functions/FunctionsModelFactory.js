'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FunctionsModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

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

class FunctionsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {FunctionsModel}
     */
    static define(sequelize) {
        /**
         * @type {FunctionsModel}
         */
        return sequelize.define('Function', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('functions'), {
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
exports.FunctionsModelFactory = FunctionsModelFactory;
//# sourceMappingURL=FunctionsModelFactory.js.map