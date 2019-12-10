'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidationPipe = undefined;

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _http = require('../http');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ValidationPipe {
    static validate(schema, data, options) {
        return Joi.validate(data, schema, options);
    }

    /**
     * @param {AppSchema} appSchema
     * @param {e.request} request
     * @returns {Promise<void>}
     */
    static async validateAppSchema(appSchema, request) {
        const options = {
            abortEarly: true,
            convert: true
        };

        if (appSchema.body) {
            const result = ValidationPipe.validate(appSchema.body, request.body, options);
            if (result.error) {
                throw new _http.BadRequestError(result.error.details[0].message, 'VALIDATION_ERROR');
            }

            request.body = result.value;
        }

        if (appSchema.query) {
            const result = ValidationPipe.validate(appSchema.query, request.query, options);
            if (result.error) {
                throw new _http.BadRequestError(result.error.details[0].message, 'VALIDATION_ERROR');
            }

            request.query = result.value;
        }

        if (appSchema.params) {
            const result = ValidationPipe.validate(appSchema.params, request.params, options);
            if (result.error) {
                throw new _http.BadRequestError(result.error.details[0].message, 'VALIDATION_ERROR');
            }

            request.params = result.value;
        }
    }
}
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=ValidationPipe.js.map