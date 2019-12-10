'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _users = require('../resources/users');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class PasswordSchema {
    constructor({ i18nService }) {
        this.i18Service = i18nService;
    }

    get password() {
        return Joi.string().min(_users.rules.minPasswordLength).max(_users.rules.maxPasswordLength).regex(_users.PasswordRegExp).options({
            language: {
                string: {
                    regex: {
                        base: this.i18Service.translate('PASSWORD_REGEX_MESSAGE')
                    },
                    max: this.i18Service.translate('PASSWORD_LENGTH_CRITERIA_MESSAGE'),
                    min: this.i18Service.translate('PASSWORD_LENGTH_CRITERIA_MESSAGE')
                }
            }

        }).required();
    }
}
exports.default = PasswordSchema;
//# sourceMappingURL=PasswordSchema.js.map