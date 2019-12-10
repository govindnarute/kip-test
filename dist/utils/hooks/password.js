'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PasswordHooks = undefined;

var _PasswordHelper = require('../../helpers/PasswordHelper');

class PasswordHooks {

    /**
     * Hash password before create hook
     * @param model
     */
    static beforeCreate(model) {
        if (model.password) {
            model.salt = _PasswordHelper.PasswordHelper.generateSalt();
            model.password = _PasswordHelper.PasswordHelper.hash(model.password + model.salt);
        }
    }

    /**
     * Hash password and generate before update hook
     * @param model
     */
    static beforeUpdate(model) {
        if (model.password && model.changed('password')) {
            model.salt = _PasswordHelper.PasswordHelper.generateSalt();
            model.password = _PasswordHelper.PasswordHelper.hash(model.password + model.salt);
        }
    }
}
exports.PasswordHooks = PasswordHooks;
//# sourceMappingURL=password.js.map