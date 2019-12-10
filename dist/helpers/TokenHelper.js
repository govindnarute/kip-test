'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class TokenHelper {
    static getToken(request, response, next) {
        request.accessToken = request.headers.authorization.split(' ')[1];
        next();
    }
}
exports.TokenHelper = TokenHelper;
//# sourceMappingURL=TokenHelper.js.map