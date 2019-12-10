import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class UserVerificationTokenSchema extends AppSchema {
    get body() {
        return Joi.object()
            .keys({
                token: Joi.string().required()
            });
    }
}
