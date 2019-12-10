'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BasicHandler = require('../../base/BasicHandler');

var _EmptyDto = require('../../base/EmptyDto');

var _erros = require('../../resources/erros');

class VerificationsRoutesHandler extends _BasicHandler.BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/verifications';
    }

    setup() {
        const controller = this.container.VerificationsController;
        this.addRoute({
            path: '/',
            method: 'put',
            summary: 'Verify uses email',
            description: 'Verify users account',
            tags: ['Verification'],
            auth: false,
            consumes: this.container.UserVerificationTokenSchema,
            produces: _EmptyDto.EmptyDto.schema,
            responseStatus: _erros.HttpStatusCode.NoContent,
            beforeHooks: [],
            handler: controller.verifyUser.bind(controller)
        });

        this.addRoute({
            path: '/',
            method: 'post',
            summary: 'Resend verification email',
            description: 'Resend verification email',
            tags: ['Verification'],
            auth: false,
            consumes: this.container.UserEmailSchema,
            produces: _EmptyDto.EmptyDto.schema,
            responseStatus: _erros.HttpStatusCode.NoContent,
            beforeHooks: [],
            handler: controller.resendVerification.bind(controller)
        });

        this.addRoute({
            path: '/password',
            method: 'post',
            summary: 'Send restore password email API',
            description: 'Restore password process',
            tags: ['Verification'],
            auth: false,
            consumes: this.container.UserEmailSchema,
            produces: _EmptyDto.EmptyDto.schema,
            responseStatus: _erros.HttpStatusCode.NoContent,
            beforeHooks: [],
            handler: controller.restorePassword.bind(controller)
        });

        this.addRoute({
            path: '/token',
            method: 'put',
            summary: 'Validate restore password token API',
            description: 'Validate restore password token',
            tags: ['Verification'],
            auth: false,
            consumes: this.container.UserVerificationTokenSchema,
            produces: _EmptyDto.EmptyDto.schema,
            responseStatus: _erros.HttpStatusCode.NoContent,
            beforeHooks: [],
            handler: controller.verifyPasswordToken.bind(controller)
        });

        this.addRoute({
            path: '/password',
            method: 'put',
            summary: 'Restore password API',
            description: 'Verify users restore password',
            tags: ['Verification'],
            auth: false,
            consumes: this.container.UserRestorePasswordSchema,
            produces: _EmptyDto.EmptyDto.schema,
            responseStatus: _erros.HttpStatusCode.NoContent,
            beforeHooks: [],
            handler: controller.verifyRestorePassword.bind(controller)
        });
    }
}
exports.default = VerificationsRoutesHandler;
//# sourceMappingURL=VerificationsRoutesHandler.js.map