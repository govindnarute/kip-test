const fastJson = require('fast-json-stringify');

import { ResponseMapperException } from './ResponseMapperException';

export class ResponseMapper {
    /**
     * @param {Object} schema
     * @param {Object} data
     * @returns {string}
     */
    static compile(schema, data) {
        try {
            let jsonString = '';

            if (schema) {
                const buildResponse = fastJson(schema);
                jsonString = buildResponse(data);
            }
            if (!data.data) {
                jsonString = `{"data": ${jsonString}}`;
            }
            return jsonString;
        } catch (e) {
            throw new ResponseMapperException(e);
        }
    }
}
