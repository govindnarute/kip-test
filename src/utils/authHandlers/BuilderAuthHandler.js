import { AuthHandler } from './AuthHandler';
import { SessionType } from '../../resources/sessions';

export class BuilderAuthHandler {

    constructor(SessionsService) {
        this.SessionsService = SessionsService;
    }

    build(params) {
        if (!params) {
            return new AuthHandler(this.SessionsService, { type: SessionType.User });
        }
        params = params instanceof Object ? params : { type: params };
        return new AuthHandler(this.SessionsService, params);
    }
}
