import { InternalServerError } from './InternalServerError';

const DEFAULT_CODE = 'RESPONSE_MAPPING_ERROR';

/**
 * extends CustomError
 */
export class ResponseMapperException extends InternalServerError {
    /**
     * @param {Error} e
     */
    constructor(e) {
        super(DEFAULT_CODE, e.message, {});
    }
}

