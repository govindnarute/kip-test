'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class IdentitySchema extends _AppSchema.AppSchema {

    identities() {
        return {
            identities: Joi.object().keys({
                isStudent: Joi.boolean().required(),
                isAlum: Joi.boolean().required(),
                isProfessional: Joi.boolean().required(),
                isCoach: Joi.boolean().required()
            }).required()
        };
    }
}
exports.default = IdentitySchema;
//# sourceMappingURL=IdentitySchema.js.map