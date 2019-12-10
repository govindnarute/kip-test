'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConflictError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'CONFLICT_ERROR';
const DEFAULT_MESSAGE = 'Conflict error';

/**
 * extends CustomError
 */
class ConflictError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.Conflict, code, message, options);
  }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=ConflictError.js.map