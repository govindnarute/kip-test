"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class CustomError extends Error {
    constructor(httpStatusCode, code, message, options) {
        super();
        this.httpStatusCode = httpStatusCode;
        this.code = code;
        this.message = message;
        this.options = options;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map