import { CustomError } from './CustomError';
import { HttpStatusCode } from '../../resources/erros';

const DEFAULT_CODE = 'INTERNAL_SERVER_ERROR';
const DEFAULT_MESSAGE = 'Internal server error';

/**
 * extends CustomError
 */
export class InternalServerError extends CustomError {
    /**
     * @param code
     * @param message
     * @param options
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
        super(HttpStatusCode.InternalError, code, message, options);
    }
}

