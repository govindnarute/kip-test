import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class TokenLifeTimeSchema extends AppSchema {
    get body() {
        return Joi.object()
            .keys({
                tokenLifeTime: Joi.number().integer().optional(),
            });
    }
}
