import { UserDto } from './UserDto';
import { SessionDto } from '../sessions/SessionDto';

export class UserSessionDto  {

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
            required: [
                'user',
                'session'
            ],
            properties: {
                user: UserDto.schema,
                session: SessionDto.schema,
            }
        };
    }
}
