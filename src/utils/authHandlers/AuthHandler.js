import passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';
import { BaseAuth } from '../../base/BaseAuth';
import { UnauthorizedError } from '../http';

export class AuthHandler extends BaseAuth {
    constructor({ SessionsService, UsersService }, params) {
        super();
        this.params = params;

        this.usersService = UsersService;

        passport.use(new BearerStrategy.Strategy((token, cb) => {
            SessionsService
                .findSession(token)
                .then(user => cb(null, user))
                .catch(() => cb(new UnauthorizedError()));
        }));
    }

    /**
     * @return {function(e.Request, e.Response, function)}
     */
    authenticator() {
        const { type, role } = this.params;


        return (req, res, next) => {
            passport.authenticate('bearer', async (error, user) => {
                if (error || !user) {
                    return next(new UnauthorizedError());
                }

                if (type && type !== user.type) {
                    return next(new UnauthorizedError());
                }

                if (role && role !== user.role) {
                    return next(new UnauthorizedError());
                }

                req.user = user;

                const currentData = new Date().toISOString().slice(0, 19).replace('T', ' ');
                await this.usersService.updatesUserById(user.userId, { lastVisitedAt: currentData });

                next();
            })(req, res, next);
        };
    }

    /**
     * @return {Object}
     */
    toSchema() {
        return {
            bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Bearer <ACCESS_TOKEN>'
            }
        };
    }
}
