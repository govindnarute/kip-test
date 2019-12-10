import { Sequelize as DataTypes } from 'sequelize';

export class ModelDefinitionBuilder {
    /**
     * @param {sequelize.DefineAttributes} attributes
     * @return {sequelize.DefineAttributes}
     */
    static properties(attributes) {
        return Object.assign({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },

            updatedAt: {
                type: DataTypes.DATE
            },
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
            underscored: false,
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
