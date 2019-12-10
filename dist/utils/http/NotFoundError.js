'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'NOT_FOUND_ERROR';
const DEFAULT_MESSAGE = 'Entity not found';

/**
 * extends CustomError
 */
class NotFoundError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.NotFound, code, message, options);
  }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map