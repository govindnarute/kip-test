import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class PasswordChangeSchema extends AppSchema {
    constructor({ i18nService, PasswordSchema }) {
        super();
        this.i18Service = i18nService;
        this.passwordSchema = PasswordSchema;
    }

    get body() {
        return Joi.object()
            .keys({
                password: this.passwordSchema.password,
                newPassword: this.passwordSchema.password,
            });
    }
}
