'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CredentialsModelFactory = undefined;

var _sequelize = require('sequelize');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} CredentialsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<CredentialsInstanceAttributes>} CredentialsInstance
 */

/**
 * @typedef {sequelize.Model<CredentialsInstance>} CredentialsModel
 */

class CredentialsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {CredentialsModel}
     */
    static define(sequelize) {
        /**
         * @type {CredentialsModel}
         */
        return sequelize.define('Credential', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            name: {
                type: sequelize.Sequelize.STRING(100),
                allowNull: false
            },

            isShown: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('credentials'), {
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
exports.CredentialsModelFactory = CredentialsModelFactory;
//# sourceMappingURL=CredentialsModelFactory.js.map