'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BasicHandler = require('../../base/BasicHandler');

var _studentSchools = require('../../models/studentSchools');

var _erros = require('../../resources/erros');

class SchoolsRoutesHandler extends _BasicHandler.BasicHandler {
    constructor(container) {
        super();
        this.container = container;
        this.apiRoot = '/schools';
    }

    setup() {
        const controller = this.container.SchoolsController;

        this.addRoute({
            path: '/',
            method: 'post',
            summary: 'Add Student/Alum school info API',
            description: 'Set \'id=null\' to add your own school/degree etc. Location can\'t be added. Open schemas for see full request body',
            tags: ['Identities info'],
            auth: true,
            consumes: this.container.UserSchoolsSchema,
            produces: _studentSchools.StudentSchoolsDto.schema,
            responseStatus: _erros.HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.createSchools.bind(controller)
        });
    }
}
exports.default = SchoolsRoutesHandler;
//# sourceMappingURL=SchoolsRoutesHandler.js.map