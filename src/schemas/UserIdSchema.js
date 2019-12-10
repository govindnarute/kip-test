import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class UserIdSchema extends AppSchema {
    get params() {

        return Joi.object()
            .keys({
                userId: Joi
                    .number()
                    .integer()
                    .required()
            })
            .concat(super.params);
    }
}
