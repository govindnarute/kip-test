'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BasicHandler = require('../../base/BasicHandler');

var _UserSessionDto = require('../../models/users/UserSessionDto');

var _erros = require('../../resources/erros');

class SocialsRoutesHandler extends _BasicHandler.BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/socials';
    }

    setup() {
        const controller = this.container.SocialsController;
        this.addRoute({
            path: '/sessions/linkedin',
            method: 'post',
            summary: 'Linkedin login API',
            description: 'Linkedin login API. Send \'type\' value on registration step',
            tags: ['Socials'],
            auth: false,
            consumes: this.container.LinkedInSignInSchema,
            produces: _UserSessionDto.UserSessionDto.schema,
            responseStatus: _erros.HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.loginByLinkedIn.bind(controller)
        });
    }
}
exports.default = SocialsRoutesHandler;
//# sourceMappingURL=SocialsRoutesHandler.js.map