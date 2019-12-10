'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

var _users = require('../resources/users');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class LinkedInSignInSchema extends _AppSchema.AppSchema {

    get body() {
        const allowedTypes = Object.keys(_users.userTypes).map(key => _users.userTypes[key]);

        return Joi.object().keys({
            type: Joi.number().integer().valid(allowedTypes).optional(),
            code: Joi.string().required(),
            redirectUri: Joi.string().required()
        });
    }
}
exports.default = LinkedInSignInSchema;
//# sourceMappingURL=LinkedInSignInSchema.js.map