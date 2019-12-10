'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSessionDto = undefined;

var _UserDto = require('./UserDto');

var _SessionDto = require('../sessions/SessionDto');

class UserSessionDto {

    /**
     * @param user<UserDto>
     * @param session<SessionDto>
     */
    constructor(user, session) {
        /**
         * @type {object}
         */
        this.user = user;

        /**
         * @type {object}
         */
        this.session = session;
    }

    static get schema() {
        return {
            title: 'UserSessionSchema',
            type: 'object',
            required: ['user', 'session'],
            properties: {
                user: _UserDto.UserDto.schema,
                session: _SessionDto.SessionDto.schema
            }
        };
    }
}
exports.UserSessionDto = UserSessionDto;
//# sourceMappingURL=UserSessionDto.js.map