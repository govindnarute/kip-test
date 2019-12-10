import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { rules, userTypes  } from '../resources/users';

export default class UpdateUserInfoSchema extends AppSchema {

    constructor({ IdentitySchema }) {
        super();
        this.identitySchema = IdentitySchema;
    }

    get body() {
        const allowedTypes = Object.keys(userTypes).map(key => userTypes[key]);

        return Joi.object()
            .keys(Object.assign({
                firstName: Joi.string()
                    .min(rules.minNameLength)
                    .max(rules.maxNameLength)
                    .trim()
                    .required(),
                lastName: Joi.string()
                    .min(rules.minNameLength)
                    .max(rules.maxNameLength)
                    .trim()
                    .required(),
                type: Joi.number()
                    .integer()
                    .valid(allowedTypes)
                    .optional(),
                headline: Joi.string()
                    .min(rules.minNameLength)
                    .max(rules.maxNameLength)
                    .trim()
                    .allow('')
                    .optional(),
                summary: Joi.string()
                    .min(rules.minSummaryLength)
                    .max(rules.maxSummaryLength)
                    .trim()
                    .allow('')
                    .optional(),
                location: Joi.object()
                    .keys({
                        id: Joi.number()
                            .integer()
                            .positive()
                            .required(),
                        name: Joi.string().required(),
                    })
                    .allow(null)
                    .required()
            }, this.identitySchema.identities()));
    }
}
