import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { userTypes  } from '../resources/users';

export default class LinkedInSignInSchema extends AppSchema {

    get body() {
        const allowedTypes = Object.keys(userTypes).map(key => userTypes[key]);

        return Joi.object()
            .keys({
                type: Joi
                    .number()
                    .integer()
                    .valid(allowedTypes)
                    .optional(),
                code: Joi
                    .string()
                    .required(),
                redirectUri: Joi
                    .string()
                    .required(),
            });
    }
}
