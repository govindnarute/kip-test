'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponseMapperException = undefined;

var _InternalServerError = require('./InternalServerError');

const DEFAULT_CODE = 'RESPONSE_MAPPING_ERROR';

/**
 * extends CustomError
 */
class ResponseMapperException extends _InternalServerError.InternalServerError {
  /**
   * @param {Error} e
   */
  constructor(e) {
    super(DEFAULT_CODE, e.message, {});
  }
}
exports.ResponseMapperException = ResponseMapperException;
//# sourceMappingURL=ResponseMapperException.js.map