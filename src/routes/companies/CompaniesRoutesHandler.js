import { BasicHandler } from '../../base/BasicHandler';
import { HttpStatusCode } from '../../resources/erros';
import { UserProfessionalDto } from '../../models/userProfessionals';

export default class CompaniesRoutesHandler extends BasicHandler {
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
            produces: UserProfessionalDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [
                this.container.UsersService.checkUserIdentities.bind(this.container.UsersService)
            ],
            handler: controller.createCompanies.bind(controller),
        });

    }
}
