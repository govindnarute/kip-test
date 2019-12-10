'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

var _users = require('../resources/users');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class UserAvailabilitySchema extends _AppSchema.AppSchema {

    get body() {
        const allowedId = _users.userAvailabilityTypes.map(item => item.id);

        return Joi.object().keys({
            connections: Joi.number().integer().min(0).max(10).allow(null).required(),
            availableFor: Joi.object().keys({
                id: Joi.number().integer().valid(allowedId).required(),
                name: Joi.string().trim().required()
            }).required()
        });
    }
}
exports.default = UserAvailabilitySchema;
//# sourceMappingURL=UserAvailabilitySchema.js.map