'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HelpersSchema = undefined;

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class HelpersSchema {
    /**
     * Base id|name object schema
     * @param {boolean} isRequired
     * @param {boolean} allowNull
     * @param {number} maxNameLength
     * @returns {Promise.<StudentSchoolDto>}
     */
    static baseIdNameSchema(isRequired, allowNull, maxNameLength) {
        const baseSchema = {
            id: Joi.number().integer().positive().required(),
            name: Joi.string().max(maxNameLength).trim().required()
        };

        if (allowNull) {
            Object.assign(baseSchema.id, baseSchema.id.allow(null));
        }

        const schema = Joi.object().keys(baseSchema);

        if (isRequired) {
            Object.assign(schema, schema.required());
        } else {
            Object.assign(schema, schema.optional());
        }

        return schema;
    }
}
exports.HelpersSchema = HelpersSchema;
//# sourceMappingURL=HelpersSchema.js.map