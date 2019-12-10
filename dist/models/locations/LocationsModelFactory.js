'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocationsModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} LocationsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<LocationsInstanceAttributes>} LocationsInstance
 */

/**
 * @typedef {sequelize.Model<LocationsInstance>} LocationsModel
 */

class LocationsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {LocationsModel}
     */
    static define(sequelize) {
        /**
         * @type {LocationsModel}
         */
        return sequelize.define('Location', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('locations'), {
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
exports.LocationsModelFactory = LocationsModelFactory;
//# sourceMappingURL=LocationsModelFactory.js.map