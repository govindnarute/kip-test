import { CustomError } from './CustomError';
import { HttpStatusCode } from '../../resources/erros';

const DEFAULT_CODE = 'CONFLICT_ERROR';
const DEFAULT_MESSAGE = 'Conflict error';

/**
 * extends CustomError
 */
export class ConflictError extends CustomError {
    /**
     * @param code
     * @param message
     * @param options
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
        super(HttpStatusCode.Conflict, code, message, options);
    }
}

