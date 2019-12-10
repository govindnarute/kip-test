import { BasicHandler } from '../../base/BasicHandler';
import { UserSessionDto } from '../../models/users/UserSessionDto';
import { HttpStatusCode } from '../../resources/erros';

export default class SocialsRoutesHandler extends BasicHandler {
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
            produces: UserSessionDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.loginByLinkedIn.bind(controller),
        });
    }
}
