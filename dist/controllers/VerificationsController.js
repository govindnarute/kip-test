'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('../utils/http');

var _EmptyDto = require('../base/EmptyDto');

var _users = require('../resources/users');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VerificationsController {
    constructor({ SessionsService, MailerService, VerificationsService, UsersService }) {
        this.sessionsService = SessionsService;
        this.mailerService = MailerService;
        this.verificationsService = VerificationsService;
        this.usersService = UsersService;
    }

    /**
     * Email verification token
     * @param {e.Request} request
     * @return {Promise<EmptyDto>}
     */
    async verifyUser(request) {
        const verificationToken = await this.verificationsService.getTokenByType(request.body.token, _users.tokenTypes.verification);

        if (!verificationToken) {
            throw new _http.BadRequestError('TOKEN_INVALID');
        }

        if (verificationToken.isUsed) {
            throw new _http.BadRequestError('TOKEN_USED');
        }

        const decoded = await this.sessionsService.verifyToken(request.body.token);
        const user = await this.usersService.getUserById(decoded.data.userId);

        if (!user) {
            throw new _http.UnprocessableError('USER_NOT_FOUND');
        }

        if (user.isVerified) {
            throw new _http.UnprocessableError('ALREADY_VERIFIED', 'ALREADY_VERIFIED');
        }

        await user.update({ isVerified: true });
        await verificationToken.update({ isUsed: true });

        return new _EmptyDto.EmptyDto();
    }

    /**
     * Resend verification email
     * @param {e.Request} request
     * @return {Promise<EmptyDto>}
     */
    async resendVerification(request) {
        const user = await this.usersService.getUserByEmailWithVerificationToken(request.body.email, _users.tokenTypes.verification);

        if (!user) {
            throw new _http.BadRequestError('NO_SUCH_EMAIL');
        }

        if (user.isVerified) {
            throw new _http.UnprocessableError('ALREADY_VERIFIED');
        }

        // check if users has attempts left
        if (user.verificationToken && user.verificationToken.attempt >= _users.maxAttempts && (0, _moment2.default)().isBefore((0, _moment2.default)(user.verificationToken.createdAt).add(24, 'hour'))) {
            throw new _http.BadRequestError('ATTEMPTS_EXCEEDED');
        }

        // delete old token and attempt counter after 24 h period if exists
        if (user.verificationToken && (0, _moment2.default)().isAfter((0, _moment2.default)(user.verificationToken.createdAt).add(24, 'hour'))) {
            await user.verificationToken.destroy();
        }

        const token = await this.verificationsService.generateToken(user, request.body.tokenLifeTime);
        await this.verificationsService.updateOrCreateToken(user, token, _users.tokenTypes.verification);

        this.mailerService.sendVerificationEmail(user, token);

        return new _EmptyDto.EmptyDto();
    }

    /**
     * Send restore password email
     * @param {e.Request} request
     * @returns {EmptyDto}
     */
    async restorePassword(request) {
        const scope = ['withSocial'];
        const user = await this.usersService.getUserByEmailWithVerificationToken(request.body.email, _users.tokenTypes.password, scope);

        if (!user) {
            throw new _http.NotFoundError('USER_NOT_FOUND');
        }

        if (user.social) {
            throw new _http.NotFoundError('CONNECTED_LINKED_IN_ACCOUNT');
        }

        const token = await this.verificationsService.generateToken(user, request.body.tokenLifeTime);
        await this.verificationsService.updateOrCreateToken(user, token, _users.tokenTypes.password);

        this.mailerService.sendRestorePasswordEmail(user, token);

        return new _EmptyDto.EmptyDto();
    }

    /**
     * Verify restore password
     * @param {e.Request} request
     * @returns {UserDto}
     */
    async verifyRestorePassword(request) {
        const decoded = this.sessionsService.verifyToken(request.body.token);

        const verificationToken = await this.verificationsService.getTokenByType(request.body.token, _users.tokenTypes.password);

        if (!verificationToken) {
            throw new _http.BadRequestError('TOKEN_INVALID');
        }

        if (verificationToken.isUsed) {
            throw new _http.BadRequestError('PASSWORD_RESTORED');
        }

        const user = await this.usersService.getUserById(decoded.data.userId);

        if (!user) {
            throw new _http.UnprocessableError('USER_NOT_FOUND');
        }

        await user.update({ password: request.body.password });

        await verificationToken.update({ isUsed: true });
        return new _EmptyDto.EmptyDto();
    }

    /**
     * * Verify restore password token
     * @param {e.Request} request
     * @return {Promise<EmptyDto>}
     */
    async verifyPasswordToken(request) {
        this.sessionsService.verifyToken(request.body.token);

        const verificationToken = await this.verificationsService.getTokenByType(request.body.token, _users.tokenTypes.password);

        if (!verificationToken) {
            throw new _http.BadRequestError('TOKEN_INVALID');
        }

        if (verificationToken.isUsed) {
            throw new _http.BadRequestError('PASSWORD_RESTORED');
        }

        return new _EmptyDto.EmptyDto();
    }
}
exports.default = VerificationsController;
//# sourceMappingURL=VerificationsController.js.map