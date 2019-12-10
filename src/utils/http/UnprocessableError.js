import { CustomError } from './CustomError';
import { HttpStatusCode } from '../../resources/erros';

const DEFAULT_CODE = 'UNPROCESSABLE_ERROR';
const DEFAULT_MESSAGE = 'Unprocessable entity error';

/**
 * extends CustomError
 */
export class UnprocessableError extends CustomError {
    /**
     * @param code
     * @param message
     * @param options
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
        super(HttpStatusCode.Unprocessable, code, message, options);
    }
}

