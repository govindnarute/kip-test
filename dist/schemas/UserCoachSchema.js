'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

var _users = require('../resources/users');

var _HelpersSchema = require('./HelpersSchema');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class UserCoachSchema extends _AppSchema.AppSchema {

    get body() {
        return Joi.object().keys({
            expertise: Joi.array().items(_HelpersSchema.HelpersSchema.baseIdNameSchema(true, true, _users.rules.maxIdentityNameLength)).min(1).max(_users.rules.maxIdentityArrayLength).unique().required(),
            credentials: Joi.array().items(_HelpersSchema.HelpersSchema.baseIdNameSchema(true, true, _users.rules.maxCredentialsNameLength)).min(1).max(_users.rules.maxIdentityArrayLength).unique().optional(),
            yearOfExperience: Joi.number().positive().precision(1).max(100).required()
        });
    }
}
exports.default = UserCoachSchema;
//# sourceMappingURL=UserCoachSchema.js.map