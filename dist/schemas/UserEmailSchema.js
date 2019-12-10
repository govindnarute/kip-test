'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class UserEmailSchema extends _AppSchema.AppSchema {
    constructor({ TokenLifeTimeSchema }) {
        super();
        this.tokenLifeTimeSchema = TokenLifeTimeSchema;
    }

    get body() {
        return Joi.object().keys({
            email: Joi.string().email().required()
        }).concat(this.tokenLifeTimeSchema.body);
    }
}
exports.default = UserEmailSchema;
//# sourceMappingURL=UserEmailSchema.js.map