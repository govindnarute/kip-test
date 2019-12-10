'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthHandler = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportHttpBearer = require('passport-http-bearer');

var BearerStrategy = _interopRequireWildcard(_passportHttpBearer);

var _BaseAuth = require('../../base/BaseAuth');

var _http = require('../http');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthHandler extends _BaseAuth.BaseAuth {
    constructor({ SessionsService, UsersService }, params) {
        super();
        this.params = params;

        this.usersService = UsersService;

        _passport2.default.use(new BearerStrategy.Strategy((token, cb) => {
            SessionsService.findSession(token).then(user => cb(null, user)).catch(() => cb(new _http.UnauthorizedError()));
        }));
    }

    /**
     * @return {function(e.Request, e.Response, function)}
     */
    authenticator() {
        const { type, role } = this.params;

        return (req, res, next) => {
            _passport2.default.authenticate('bearer', async (error, user) => {
                if (error || !user) {
                    return next(new _http.UnauthorizedError());
                }

                if (type && type !== user.type) {
                    return next(new _http.UnauthorizedError());
                }

                if (role && role !== user.role) {
                    return next(new _http.UnauthorizedError());
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
exports.AuthHandler = AuthHandler;
//# sourceMappingURL=AuthHandler.js.map