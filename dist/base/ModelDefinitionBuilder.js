'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModelDefinitionBuilder = undefined;

var _sequelize = require('sequelize');

class ModelDefinitionBuilder {
    /**
     * @param {sequelize.DefineAttributes} attributes
     * @return {sequelize.DefineAttributes}
     */
    static properties(attributes) {
        return Object.assign({
            id: {
                type: _sequelize.Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            createdAt: {
                type: _sequelize.Sequelize.DATE,
                defaultValue: _sequelize.Sequelize.NOW
            },

            updatedAt: {
                type: _sequelize.Sequelize.DATE
            }
        }, attributes);
    }

    /**
     * @template T
     * @param {string} tableName
     * @return {sequelize.DefineOptions<T>}
     */
    static options(tableName) {
        return {
            tableName,
            timestamps: true,
            underscored: false
        };
    }

    static scopes() {
        return {
            /**
             * @this {sequelize.Model}
             * @param {Object} pagination
             */
            pagination(pagination) {
                return { limit: pagination.limit, offset: pagination.offset };
            },

            /**
             * @param {'ASC'|'DESC'} order
             * @param {string=} field
             * @param {boolean=} additionalOrder
             */
            orderBy(order = 'desc', field = 'id', additionalOrder = false) {
                const orderBy = [[field, order]];

                if (field !== 'id' && additionalOrder) {
                    orderBy.push(['id', order]);
                }

                return { order: orderBy };
            }
        };
    }
}
exports.ModelDefinitionBuilder = ModelDefinitionBuilder;
//# sourceMappingURL=ModelDefinitionBuilder.js.map