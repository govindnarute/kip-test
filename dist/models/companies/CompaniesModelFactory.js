'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CompaniesModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

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

class CompaniesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CompaniesModel}
     */
    static define(sequelize) {
        /**
         * @type {CompaniesModel}
         */
        return sequelize.define('Company', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('companies'), {
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
exports.CompaniesModelFactory = CompaniesModelFactory;
//# sourceMappingURL=CompaniesModelFactory.js.map