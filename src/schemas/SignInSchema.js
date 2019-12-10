import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class SignInSchema extends AppSchema {
    get body() {
        return Joi.object()
            .keys({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                lifeTime: Joi.number().integer().positive().optional(),
            });
    }
}
