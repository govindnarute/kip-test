'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpertiseModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} ExpertiseInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<ExpertiseInstanceAttributes>} ExpertiseInstance
 */

/**
 * @typedef {sequelize.Model<ExpertiseInstance>} ExpertiseModel
 */

class ExpertiseModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ExpertiseModel}
     */
    static define(sequelize) {
        /**
         * @type {ExpertiseModel}
         */
        return sequelize.define('Expertise', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('expertise'), {
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
exports.ExpertiseModelFactory = ExpertiseModelFactory;
//# sourceMappingURL=ExpertiseModelFactory.js.map