'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('../utils/http');

var _UserSessionDto = require('../models/users/UserSessionDto');

var _UserDto = require('../models/users/UserDto');

var _EmptyDto = require('../base/EmptyDto');

var _SessionDto = require('../models/sessions/SessionDto');

var _PasswordHelper = require('../helpers/PasswordHelper');

var _sessions = require('../resources/sessions');

class SessionsController {
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
            throw new _http.UnprocessableError('WRONG_PASSWORD');
        }
        if (!_PasswordHelper.PasswordHelper.compare(`${request.body.password}${user.salt}`, user.password)) {
            throw new _http.UnprocessableError('WRONG_PASSWORD');
        }

        user = await user.update({ isFirstEnter: false });

        const tokens = await this.sessionsService.create(user.id, {
            type: _sessions.SessionType.User,
            lifeTime: request.body.lifeTime
        });

        return new _UserSessionDto.UserSessionDto(new _UserDto.UserDto(user), new _SessionDto.SessionDto(tokens));
    }

    /**
     * @param {e.Request} request
     * @returns {Promise<EmptyDto>}
     */
    async logOut(request) {
        await this.sessionsService.destroy(request.user.userId, request.accessToken);
        return new _EmptyDto.EmptyDto();
    }

    /**
     * @param {e.Request} request
     * @returns {SessionDto}
     */
    async refresh(request) {
        const tokens = await this.sessionsService.refresh(request.body.refreshToken);
        return new _SessionDto.SessionDto(tokens);
    }
}
exports.default = SessionsController;
//# sourceMappingURL=SessionsController.js.map