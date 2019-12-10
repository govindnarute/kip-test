import { CustomError } from './CustomError';
import { HttpStatusCode } from '../../resources/erros';

const DEFAULT_CODE = 'BAD_REQUEST_ERROR';
const DEFAULT_MESSAGE = 'Bad request error';

/**
 * extends CustomError
 */
export class BadRequestError extends CustomError {
    /**
     * @param code
     * @param message
     * @param options
     */
    constructor(message = DEFAULT_MESSAGE, code = DEFAULT_CODE, options = {}) {
        super(HttpStatusCode.BadRequest, code, message, options);
    }
}

