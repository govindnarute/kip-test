'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'UNAUTHORIZED_ERROR';
const DEFAULT_MESSAGE = 'Unauthorized error';

/**
 * extends CustomError
 */
class UnauthorizedError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.Unauthorized, code, message, options);
  }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=UnauthorizedError.js.map