import { CustomError } from './CustomError';
import { HttpStatusCode } from '../../resources/erros';

const DEFAULT_CODE = 'GATEWAY_TIMEOUT_ERROR';
const DEFAULT_MESSAGE = 'Gateway timeout error';

/**
 * extends CustomError
 */
export class GatewayTimeOutError extends CustomError {
    /**
     * @param code
     * @param message
     * @param options
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
        super(HttpStatusCode.GatewayTimeOut, code, message, options);
    }
}

