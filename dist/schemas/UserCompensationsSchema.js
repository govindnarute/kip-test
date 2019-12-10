'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

var _users = require('../resources/users');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class UserCompensationsSchema extends _AppSchema.AppSchema {

    get body() {
        return Joi.object().keys({
            rate: Joi.number().integer().min(0).max(9999).allow('').required().when('isCompensationRequire', {
                is: Joi.boolean().valid(false),
                then: Joi.number().optional()
            }),
            notes: Joi.string().max(_users.rules.maxNotesLength).allow('').trim().optional(),
            isCompensationRequire: Joi.boolean().optional(),
            hideCompensation: Joi.boolean().optional()
        });
    }
}
exports.default = UserCompensationsSchema;
//# sourceMappingURL=UserCompensationsSchema.js.map