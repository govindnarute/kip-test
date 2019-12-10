import { BasicHandler } from '../../base/BasicHandler';
import { StudentSchoolsDto } from '../../models/studentSchools';
import { HttpStatusCode } from '../../resources/erros';

export default class SchoolsRoutesHandler extends BasicHandler {
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
            produces: StudentSchoolsDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.createSchools.bind(controller),
        });

    }
}
