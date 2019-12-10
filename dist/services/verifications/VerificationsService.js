'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _users = require('../../resources/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VerificationsService {
    constructor({ config, DBConnection }) {
        this.config = config;
        this.VerificationToken = DBConnection.model('VerificationToken');
    }

    /**
     * Generate token
     * @param {UserDto} user
     * @param {number} tokenLifeTime
     * @return {*}
     */
    generateToken(user, tokenLifeTime) {
        return _jsonwebtoken2.default.sign({
            data: { userId: user.id }
        }, this.config.get('jwt.key'), {
            expiresIn: tokenLifeTime || this.config.mailer.tokenLifeTime
        });
    }

    /**
     * Save token
     * @param userId
     * @param token
     * @param type
     * @returns {Promise.<void>}
     */
    saveToken(userId, token, type) {
        return this.VerificationToken.create({
            userId,
            token,
            type
        });
    }

    /**
     * Save token
     * @param user
     * @param token
     * @param type
     * @returns {Promise.<void>}
     */
    updateOrCreateToken(user, token, type = _users.tokenTypes.verification) {
        let attempt = 0;

        if (user.verificationToken) {
            attempt = type === _users.tokenTypes.verification ? user.verificationToken.attempt + 1 : 0;
            return user.verificationToken.update({ token, attempt, isUsed: false });
        }

        return this.VerificationToken.create({ token, attempt, userId: user.id, type });
    }

    /**
     * Get token by type
     * @param token
     * @param type
     * @returns {Promise.<Promise.<Model>|Promise<any | TInstance>>}
     */
    getTokenByType(token, type) {
        return this.VerificationToken.scope({ method: ['byType', type] }).findOne({ where: { token } });
    }
}
exports.default = VerificationsService;
//# sourceMappingURL=VerificationsService.js.map