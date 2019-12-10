'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResponseMapper = undefined;

var _ResponseMapperException = require('./ResponseMapperException');

const fastJson = require('fast-json-stringify');

class ResponseMapper {
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
            throw new _ResponseMapperException.ResponseMapperException(e);
        }
    }
}
exports.ResponseMapper = ResponseMapper;
//# sourceMappingURL=ResponseMapper.js.map