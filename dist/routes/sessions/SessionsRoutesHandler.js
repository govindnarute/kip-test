'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BasicHandler = require('../../base/BasicHandler');

var _UserSessionDto = require('../../models/users/UserSessionDto');

var _TokenHelper = require('../../helpers/TokenHelper');

var _EmptyDto = require('../../base/EmptyDto');

var _SessionDto = require('../../models/sessions/SessionDto');

var _erros = require('../../resources/erros');

class SessionsRouterHandler extends _BasicHandler.BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/sessions';
    }

    setup() {
        const controller = this.container.SessionsController;
        this.addRoute({
            path: '/',
            method: 'post',
            summary: 'User sign in API',
            description: 'Sign in existing user, lifeTime - in seconds',
            tags: ['Sessions'],
            auth: false,
            consumes: this.container.SignInSchema,
            produces: _UserSessionDto.UserSessionDto.schema,
            responseStatus: _erros.HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.startSession.bind(controller)
        });

        this.addRoute({
            path: '/',
            method: 'put',
            summary: 'Refresh session API',
            description: 'Refresh expired session',
            tags: ['Sessions'],
            auth: false,
            consumes: this.container.RefreshSessionSchema,
            produces: _SessionDto.SessionDto.schema,
            responseStatus: _erros.HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.refresh.bind(controller)
        });

        this.addRoute({
            path: '/',
            method: 'delete',
            summary: 'User sign out API',
            description: 'Destroy session',
            tags: ['Sessions'],
            auth: true,
            consumes: this.container.EmptySchema,
            produces: _EmptyDto.EmptyDto.schema,
            responseStatus: _erros.HttpStatusCode.NoContent,
            beforeHooks: [_TokenHelper.TokenHelper.getToken],
            handler: controller.logOut.bind(controller)
        });
    }
}
exports.default = SessionsRouterHandler;
//# sourceMappingURL=SessionsRoutesHandler.js.map