import { BadRequestError, UnprocessableError, NotFoundError } from '../utils/http';
import { EmptyDto } from '../base/EmptyDto';
import { tokenTypes, maxAttempts } from '../resources/users';
import moment from 'moment';

export default class VerificationsController {
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
        const verificationToken = await this.verificationsService.getTokenByType(request.body.token, tokenTypes.verification);

        if(!verificationToken) {
            throw new BadRequestError('TOKEN_INVALID');
        }

        if(verificationToken.isUsed) {
            throw new BadRequestError('TOKEN_USED');
        }

        const decoded = await this.sessionsService.verifyToken(request.body.token);
        const user = await this.usersService.getUserById(decoded.data.userId);

        if(!user) {
            throw new UnprocessableError('USER_NOT_FOUND');
        }

        if(user.isVerified) {
            throw new UnprocessableError('ALREADY_VERIFIED', 'ALREADY_VERIFIED');
        }

        await user.update({ isVerified: true });
        await verificationToken.update({ isUsed: true });

        return new EmptyDto();
    }

    /**
     * Resend verification email
     * @param {e.Request} request
     * @return {Promise<EmptyDto>}
     */
    async resendVerification(request) {
        const user = await this.usersService.getUserByEmailWithVerificationToken(request.body.email, tokenTypes.verification);

        if(!user) {
            throw new BadRequestError('NO_SUCH_EMAIL');
        }

        if(user.isVerified) {
            throw new UnprocessableError('ALREADY_VERIFIED');
        }

        // check if users has attempts left
        if(user.verificationToken
            && user.verificationToken.attempt >= maxAttempts
            && moment().isBefore(moment(user.verificationToken.createdAt).add(24, 'hour'))) {
            throw new BadRequestError('ATTEMPTS_EXCEEDED');
        }

        // delete old token and attempt counter after 24 h period if exists
        if(user.verificationToken && moment().isAfter(moment(user.verificationToken.createdAt).add(24, 'hour'))) {
            await user.verificationToken.destroy();
        }

        const token = await this.verificationsService.generateToken(user, request.body.tokenLifeTime);
        await this.verificationsService.updateOrCreateToken(user, token, tokenTypes.verification);

        this.mailerService.sendVerificationEmail(user, token);

        return new EmptyDto();
    }

    /**
     * Send restore password email
     * @param {e.Request} request
     * @returns {EmptyDto}
     */
    async restorePassword(request) {
        const scope = ['withSocial'];
        const user = await this.usersService.getUserByEmailWithVerificationToken(request.body.email, tokenTypes.password, scope);

        if (!user) {
            throw new NotFoundError('USER_NOT_FOUND');
        }

        if (user.social) {
            throw new NotFoundError('CONNECTED_LINKED_IN_ACCOUNT');
        }

        const token = await this.verificationsService.generateToken(user, request.body.tokenLifeTime);
        await this.verificationsService.updateOrCreateToken(user, token, tokenTypes.password);

        this.mailerService.sendRestorePasswordEmail(user, token);

        return new EmptyDto();
    }

    /**
     * Verify restore password
     * @param {e.Request} request
     * @returns {UserDto}
     */
    async verifyRestorePassword(request) {
        const decoded = this.sessionsService.verifyToken(request.body.token);

        const verificationToken = await this.verificationsService.getTokenByType(request.body.token, tokenTypes.password);

        if(!verificationToken) {
            throw new BadRequestError('TOKEN_INVALID');
        }

        if(verificationToken.isUsed) {
            throw new BadRequestError('PASSWORD_RESTORED');
        }

        const user = await this.usersService.getUserById(decoded.data.userId);

        if(!user) {
            throw new UnprocessableError('USER_NOT_FOUND');
        }

        await user.update({ password: request.body.password });

        await verificationToken.update({ isUsed: true });
        return new EmptyDto();
    }

    /**
     * * Verify restore password token
     * @param {e.Request} request
     * @return {Promise<EmptyDto>}
     */
    async verifyPasswordToken(request) {
        this.sessionsService.verifyToken(request.body.token);

        const verificationToken = await this.verificationsService.getTokenByType(request.body.token, tokenTypes.password);

        if(!verificationToken) {
            throw new BadRequestError('TOKEN_INVALID');
        }

        if(verificationToken.isUsed) {
            throw new BadRequestError('PASSWORD_RESTORED');
        }

        return new EmptyDto();
    }
}
