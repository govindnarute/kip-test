'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForbiddenError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'FORBIDDEN_ERROR';
const DEFAULT_MESSAGE = 'Forbidden error';

/**
 * extends CustomError
 */
class ForbiddenError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.Forbidden, code, message, options);
  }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=ForbiddenError.js.map