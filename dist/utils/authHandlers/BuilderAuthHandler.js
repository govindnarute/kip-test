'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BuilderAuthHandler = undefined;

var _AuthHandler = require('./AuthHandler');

var _sessions = require('../../resources/sessions');

class BuilderAuthHandler {

    constructor(SessionsService) {
        this.SessionsService = SessionsService;
    }

    build(params) {
        if (!params) {
            return new _AuthHandler.AuthHandler(this.SessionsService, { type: _sessions.SessionType.User });
        }
        params = params instanceof Object ? params : { type: params };
        return new _AuthHandler.AuthHandler(this.SessionsService, params);
    }
}
exports.BuilderAuthHandler = BuilderAuthHandler;
//# sourceMappingURL=BuilderAuthHandler.js.map