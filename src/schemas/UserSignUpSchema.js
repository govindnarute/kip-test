import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { userTypes  } from '../resources/users';

export default class UserSignUpSchema extends AppSchema {

    constructor({ i18nService, TokenLifeTimeSchema, PasswordSchema }) {
        super();
        this.tokenLifeTimeSchema = TokenLifeTimeSchema;
        this.i18Service = i18nService;
        this.passwordSchema = PasswordSchema;
    }
    get body() {
        const allowedTypes = Object.keys(userTypes).map(key => userTypes[key]);

        return Joi.object()
            .keys({
                email: Joi.string().email().required(),
                type: Joi.number()
                    .integer()
                    .valid(allowedTypes)
                    .required(),
                password: this.passwordSchema.password
            })
            .concat(this.tokenLifeTimeSchema.body);
    }
}
