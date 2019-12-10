'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GatewayTimeOutError = undefined;

var _CustomError = require('./CustomError');

var _erros = require('../../resources/erros');

const DEFAULT_CODE = 'GATEWAY_TIMEOUT_ERROR';
const DEFAULT_MESSAGE = 'Gateway timeout error';

/**
 * extends CustomError
 */
class GatewayTimeOutError extends _CustomError.CustomError {
  /**
   * @param code
   * @param message
   * @param options
   */
  constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
    super(_erros.HttpStatusCode.GatewayTimeOut, code, message, options);
  }
}
exports.GatewayTimeOutError = GatewayTimeOutError;
//# sourceMappingURL=GatewayTimeOutError.js.map