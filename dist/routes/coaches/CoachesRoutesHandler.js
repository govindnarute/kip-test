'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BasicHandler = require('../../base/BasicHandler');

var _erros = require('../../resources/erros');

var _UserCoachDto = require('../../models/userCoaches/UserCoachDto');

class CoachesRoutesHandler extends _BasicHandler.BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/coaches';
    }

    setup() {
        const controller = this.container.UserCoachController;

        this.addRoute({
            path: '/',
            method: 'post',
            summary: 'Add coach info API',
            description: 'Set \'id=null\' to add your own expertise/credentials.',
            tags: ['Identities info'],
            auth: true,
            consumes: this.container.UserCoachSchema,
            produces: _UserCoachDto.UserCoachDto.schema,
            responseStatus: _erros.HttpStatusCode.OK,
            beforeHooks: [this.container.UsersService.checkUserIdentities.bind(this.container.UsersService)],
            handler: controller.createCoachInfo.bind(controller)
        });
    }
}
exports.default = CoachesRoutesHandler;
//# sourceMappingURL=CoachesRoutesHandler.js.map