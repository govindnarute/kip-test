'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnprocessableError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'UNPROCESSABLE_ERROR';
const DEFAULT_MESSAGE = 'Unprocessable entity error';

/**
 * extends CustomError
 */
class UnprocessableError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.Unprocessable, code, message, options);
  }
}
exports.UnprocessableError = UnprocessableError;
//# sourceMappingURL=UnprocessableError.js.map