import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class UserEmailSchema extends AppSchema {
    constructor({ TokenLifeTimeSchema }) {
        super();
        this.tokenLifeTimeSchema = TokenLifeTimeSchema;
    }

    get body() {
        return Joi.object()
            .keys({
                email: Joi.string().email().required(),
            })
            .concat(this.tokenLifeTimeSchema.body);
    }
}
