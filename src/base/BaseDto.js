/**
 * @typedef {Object} BaseEntityAttributes
 * @property {number} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

export class BaseDto {
    /**
     * @param {sequelize.Instance<BaseEntityAttributes>} entity
     */
    constructor(entity) {
        /**
         * @type {number}
         */
        this.id = entity.get('id');

        /**
         * @type {string}
         */
        this.createdAt = entity.get('createdAt');

        /**
         * @type {string}
         */
        this.updatedAt = entity.get('updatedAt');
    }

    static get schema() {
        return {
            title: 'BasicModelSchema',
            type: 'object',
            required: [
                'id',
                'createdAt',
                'updatedAt'
            ],
            properties: {
                id: {
                    type: 'integer',
                    format: 'int32',
                    example: 42
                },
                createdAt: {
                    'type': 'string',
                    'format': 'date-time',
                    'example': '2018-06-26T14:03:43.982Z'
                },
                updatedAt: {
                    'type': 'string',
                    'format': 'date-time',
                    'example': '2018-06-26T14:03:43.982Z'
                }
            }
        };
    }
}
