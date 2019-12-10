'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BadRequestError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'BAD_REQUEST_ERROR';
const DEFAULT_MESSAGE = 'Bad request error';

/**
 * extends CustomError
 */
class BadRequestError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.BadRequest, code, message, options);
  }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map