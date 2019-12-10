import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class FileContentTypeSchema extends AppSchema {
    get body() {
        return Joi.object()
            .keys({
                contentType: Joi.string().required(),
            });
    }
}
