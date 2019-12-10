import { UnprocessableError } from '../utils/http';
import { UserSessionDto } from '../models/users/UserSessionDto';
import { UserDto } from '../models/users/UserDto';
import { EmptyDto } from '../base/EmptyDto';
import { SessionDto } from '../models/sessions/SessionDto';
import { PasswordHelper } from '../helpers/PasswordHelper';
import { SessionType } from '../resources/sessions';

export default class SessionsController {
    constructor({ SessionsService, UsersService }) {
        this.sessionsService = SessionsService;
        this.usersService = UsersService;
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<UserSessionDto>}
     */
    async startSession(request) {
        let user = await this.usersService.getUserByEmail(request.body.email, ['withLocation']);

        if (!user) {
            throw new UnprocessableError('WRONG_PASSWORD');
        }
        if (!PasswordHelper.compare(`${request.body.password}${user.salt}`, user.password)) {
            throw new UnprocessableError('WRONG_PASSWORD');
        }

        user = await user.update({ isFirstEnter: false });

        const tokens = await this.sessionsService.create(user.id, {
            type: SessionType.User,
            lifeTime: request.body.lifeTime
        });

        return new UserSessionDto(new UserDto(user), new SessionDto(tokens));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<EmptyDto>}
     */
    async logOut(request) {
        await this.sessionsService.destroy(request.user.userId, request.accessToken);
        return new EmptyDto();
    }

    /**
     * @param {e.Request} request
     * @returns {SessionDto}
     */
    async refresh(request) {
        const tokens = await this.sessionsService.refresh(request.body.refreshToken);
        return new SessionDto(tokens);
    }
}
