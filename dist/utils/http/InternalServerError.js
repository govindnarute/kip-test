'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalServerError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'INTERNAL_SERVER_ERROR';
const DEFAULT_MESSAGE = 'Internal server error';

/**
 * extends CustomError
 */
class InternalServerError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.InternalError, code, message, options);
  }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerError.js.map