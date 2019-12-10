'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppSchema = undefined;

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _joiToJsonSchema = require('joi-to-json-schema');

var _joiToJsonSchema2 = _interopRequireDefault(_joiToJsonSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @typedef {Object} AppJsonSchema
 * @param {Object} requestBody
 * @param {Array<Object>} parameters
 */

class AppSchema {
    get body() {
        return null;
    }
    get query() {
        return null;
    }
    get params() {
        return Joi.object().keys({
            version: Joi.string().required().default('v1')
        });
    }

    /**
     * @returns {AppJsonSchema}
     */
    toSchema() {
        return {
            requestBody: this.configRequestBody(),
            parameters: this.configRequestParams()
        };
    }

    /**
     * @returns {Object}
     */
    configRequestBody() {
        const parameters = {};
        if (this.body) {
            parameters.content = {
                'application/json': {
                    schema: (0, _joiToJsonSchema2.default)(this.body)
                }
            };
        }
        return parameters;
    }

    /**
     * @returns {Array<Object>}
     */
    configRequestParams() {
        const parameters = [];
        if (this.params) {
            const convertedSchema = (0, _joiToJsonSchema2.default)(this.params);
            Object.keys(convertedSchema.properties).forEach(key => {
                parameters.push({
                    in: 'path',
                    name: key,
                    required: convertedSchema.required && convertedSchema.required.indexOf(key) >= 0,
                    schema: convertedSchema.properties[key],
                    description: convertedSchema.properties[key].description || ''
                });
            });
        }
        if (this.query) {
            const convertedSchema = (0, _joiToJsonSchema2.default)(this.query);
            Object.keys(convertedSchema.properties).forEach(key => {
                parameters.push({
                    in: 'query',
                    name: key,
                    required: convertedSchema.required && convertedSchema.required.indexOf(key) >= 0,
                    schema: convertedSchema.properties[key],
                    description: convertedSchema.properties[key].description || ''
                });
            });
        }
        return parameters;
    }
}
exports.AppSchema = AppSchema;
//# sourceMappingURL=AppSchema.js.map