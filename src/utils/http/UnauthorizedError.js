import { CustomError } from './CustomError';
import { HttpStatusCode } from '../../resources/erros';

const DEFAULT_CODE = 'UNAUTHORIZED_ERROR';
const DEFAULT_MESSAGE = 'Unauthorized error';

/**
 * extends CustomError
 */
export class UnauthorizedError extends CustomError {
    /**
     * @param code
     * @param message
     * @param options
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
        super(HttpStatusCode.Unauthorized, code, message, options);
    }
}

