'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BasicHandler = require('../../base/BasicHandler');

var _erros = require('../../resources/erros');

var _userProfessionals = require('../../models/userProfessionals');

class CompaniesRoutesHandler extends _BasicHandler.BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/companies';
    }

    setup() {
        const controller = this.container.CompaniesController;

        this.addRoute({
            path: '/',
            method: 'post',
            summary: 'Add professional info API',
            description: 'User professional info. \'fromDate\' and \'toDate\' can send without time (e.g. 2015-05-25). Set \'id=null\' to add your own company.',
            tags: ['Identities info'],
            auth: true,
            consumes: this.container.UserProfessionalSchema,
            produces: _userProfessionals.UserProfessionalDto.schema,
            responseStatus: _erros.HttpStatusCode.OK,
            beforeHooks: [this.container.UsersService.checkUserIdentities.bind(this.container.UsersService)],
            handler: controller.createCompanies.bind(controller)
        });
    }
}
exports.default = CompaniesRoutesHandler;
//# sourceMappingURL=CompaniesRoutesHandler.js.map