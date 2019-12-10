'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mail = require('@sendgrid/mail');

var _mail2 = _interopRequireDefault(_mail);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mailer Service
 */
class MailerService {
    constructor({ config, RedisWrapper, i18nService }) {
        this.config = config;
        this.redis = RedisWrapper;
        this.i18nService = i18nService;

        _mail2.default.setApiKey(this.config.mailer.apiKey);
    }
    /**
     * @param params
     * @return {Promise<*>}
     */
    async sendMail(params) {
        return _mail2.default.send(params);
    }

    /**
     * @param {UserDto} user
     * @param {string} token
     * @return {Promise<*>}
     */
    async sendVerificationEmail(user, token) {
        return this.sendMail({
            from: this.config.mailer.from,
            to: user.email,
            subject: this.i18nService.translate('EMAIL_VERIFICATION_SUBJECT'),
            html: this.getVerificationBody(user, token)
        });
    }

    /**
     * @param user
     * @returns {Promise.<*>}
     */
    sendChangePasswordEmail(user) {
        return this.sendMail({
            from: this.config.mailer.from,
            to: user.email,
            subject: this.i18nService.translate('CHANGE_PASSWORD_SUBJECT'),
            html: this.getChangePasswordBody()
        });
    }

    /**
     * @param {UserDto} user
     * @param {string} token
     * @return {Promise<*>}
     */
    async sendRestorePasswordEmail(user, token) {
        return this.sendMail({
            from: this.config.mailer.from,
            to: user.email,
            subject: this.i18nService.translate('RESET_PASSWORD_SUBJECT'),
            html: this.getResetBody(user, token)
        });
    }

    /**
     * @param {UserDto} user
     * @param {string} token
     * @return {string}
     */
    getVerificationBody(user, token) {
        const file = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../views/emailTemplates/emailVerificationTemplate.ejs'), 'utf8');
        return _ejs2.default.render(file, {
            userEmail: user.email,
            verificationLink: `${this.config.client.url}/verifications/${token}`
        });
    }

    /**
     * @param {UserDto} user
     * @param {string} token
     * @return {string}
     */
    getResetBody(user, token) {
        const file = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../views/emailTemplates/resetPasswordTemplate.ejs'), 'utf8');
        return _ejs2.default.render(file, {
            userEmail: user.email,
            resetPasswordLink: `${this.config.client.url}/reset_password/${token}`
        });
    }

    /**
     * @returns {string}
     */
    getChangePasswordBody() {
        return this.i18nService.translate('CHANGE_PASSWORD_EMAIL');
    }
}
exports.default = MailerService;
//# sourceMappingURL=MailerService.js.map