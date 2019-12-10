import { BasicHandler } from '../../base/BasicHandler';
import { HttpStatusCode } from '../../resources/erros';
import { UserCoachDto } from '../../models/userCoaches/UserCoachDto';

export default class CoachesRoutesHandler extends BasicHandler {
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
            produces: UserCoachDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [
                this.container.UsersService.checkUserIdentities.bind(this.container.UsersService)
            ],
            handler: controller.createCoachInfo.bind(controller),
        });

    }
}
