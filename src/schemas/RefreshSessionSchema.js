import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class RefreshSessionSchema extends AppSchema {
    get body() {
        return Joi.object()
            .keys({
                refreshToken: Joi.string().required(),
            });
    }
}
