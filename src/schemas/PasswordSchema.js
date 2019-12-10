import * as Joi from 'joi';
import { PasswordRegExp } from '../resources/users';
import { rules  } from '../resources/users';

export default class PasswordSchema {
    constructor({ i18nService }) {
        this.i18Service = i18nService;
    }

    get password() {
        return Joi.string()
            .min(rules.minPasswordLength)
            .max(rules.maxPasswordLength)
            .regex(PasswordRegExp)
            .options({
                language: {
                    string: {
                        regex: {
                            base: this.i18Service.translate('PASSWORD_REGEX_MESSAGE')
                        },
                        max: this.i18Service.translate('PASSWORD_LENGTH_CRITERIA_MESSAGE'),
                        min: this.i18Service.translate('PASSWORD_LENGTH_CRITERIA_MESSAGE')
                    }
                }

            })
            .required();
    }
}
