import sgMail from '@sendgrid/mail';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

/**
 * Mailer Service
 */
export default class MailerService {
    constructor({ config, RedisWrapper, i18nService }) {
        this.config = config;
        this.redis = RedisWrapper;
        this.i18nService = i18nService;

        sgMail.setApiKey(this.config.mailer.apiKey);
    }
    /**
     * @param params
     * @return {Promise<*>}
     */
    async sendMail(params) {
        return sgMail.send(params);
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
        const file = fs.readFileSync(path.join(__dirname, '../../../views/emailTemplates/emailVerificationTemplate.ejs'), 'utf8');
        return ejs.render(file, {
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
        const file = fs.readFileSync(path.join(__dirname, '../../../views/emailTemplates/resetPasswordTemplate.ejs'), 'utf8');
        return ejs.render(file, {
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
