import { CustomError } from './CustomError';
import { HttpStatusCode } from '../../resources/erros';

const DEFAULT_CODE = 'FORBIDDEN_ERROR';
const DEFAULT_MESSAGE = 'Forbidden error';

/**
 * extends CustomError
 */
export class ForbiddenError extends CustomError {
    /**
     * @param code
     * @param message
     * @param options
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
        super(HttpStatusCode.Forbidden, code, message, options);
    }
}

