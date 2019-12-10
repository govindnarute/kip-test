'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class UserRestorePasswordSchema extends _AppSchema.AppSchema {

    constructor({ i18nService, PasswordSchema }) {
        super();
        this.i18Service = i18nService;
        this.passwordSchema = PasswordSchema;
    }

    get body() {
        return Joi.object().keys({
            password: this.passwordSchema.password,
            token: Joi.string().required()
        });
    }
}
exports.default = UserRestorePasswordSchema;
//# sourceMappingURL=UserRestorePasswordSchema.js.map