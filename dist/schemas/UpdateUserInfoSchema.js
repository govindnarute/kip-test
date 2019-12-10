'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

var _users = require('../resources/users');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class UpdateUserInfoSchema extends _AppSchema.AppSchema {

    constructor({ IdentitySchema }) {
        super();
        this.identitySchema = IdentitySchema;
    }

    get body() {
        const allowedTypes = Object.keys(_users.userTypes).map(key => _users.userTypes[key]);

        return Joi.object().keys(Object.assign({
            firstName: Joi.string().min(_users.rules.minNameLength).max(_users.rules.maxNameLength).trim().required(),
            lastName: Joi.string().min(_users.rules.minNameLength).max(_users.rules.maxNameLength).trim().required(),
            type: Joi.number().integer().valid(allowedTypes).optional(),
            headline: Joi.string().min(_users.rules.minNameLength).max(_users.rules.maxNameLength).trim().allow('').optional(),
            summary: Joi.string().min(_users.rules.minSummaryLength).max(_users.rules.maxSummaryLength).trim().allow('').optional(),
            location: Joi.object().keys({
                id: Joi.number().integer().positive().required(),
                name: Joi.string().required()
            }).allow(null).required()
        }, this.identitySchema.identities()));
    }
}
exports.default = UpdateUserInfoSchema;
//# sourceMappingURL=UpdateUserInfoSchema.js.map