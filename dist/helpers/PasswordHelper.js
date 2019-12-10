'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const crypto = require('crypto');

class PasswordHelper {
    static generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    static hash(password) {
        return crypto.createHash('md5').update(password).digest('hex');
    }

    static compare(password, hashedPassword) {
        return crypto.createHash('md5').update(password).digest('hex') === hashedPassword;
    }
}
exports.PasswordHelper = PasswordHelper;
//# sourceMappingURL=PasswordHelper.js.map