"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Base Auth Interface
 */
class BaseAuth {
    authenticator() {
        return (req, res, next) => {
            next();
        };
    }

    toSchema() {
        return {};
    }
}
exports.BaseAuth = BaseAuth;
//# sourceMappingURL=BaseAuth.js.map