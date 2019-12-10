import { BasicHandler } from '../../base/BasicHandler';
import { UserSessionDto } from '../../models/users/UserSessionDto';
import { TokenHelper } from '../../helpers/TokenHelper';
import { EmptyDto } from '../../base/EmptyDto';
import { SessionDto } from '../../models/sessions/SessionDto';
import { HttpStatusCode } from '../../resources/erros';

export default class SessionsRouterHandler extends BasicHandler {
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
            produces: UserSessionDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.startSession.bind(controller),
        });

        this.addRoute({
            path: '/',
            method: 'put',
            summary: 'Refresh session API',
            description: 'Refresh expired session',
            tags: ['Sessions'],
            auth: false,
            consumes: this.container.RefreshSessionSchema,
            produces: SessionDto.schema,
            responseStatus: HttpStatusCode.OK,
            beforeHooks: [],
            handler: controller.refresh.bind(controller),
        });

        this.addRoute({
            path: '/',
            method: 'delete',
            summary: 'User sign out API',
            description: 'Destroy session',
            tags: ['Sessions'],
            auth: true,
            consumes: this.container.EmptySchema,
            produces: EmptyDto.schema,
            responseStatus: HttpStatusCode.NoContent,
            beforeHooks: [TokenHelper.getToken],
            handler: controller.logOut.bind(controller),
        });
    }
}
