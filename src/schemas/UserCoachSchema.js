import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { rules } from '../resources/users';
import { HelpersSchema } from './HelpersSchema';

export default class UserCoachSchema extends AppSchema {

    get body() {
        return Joi.object()
            .keys({
                expertise: Joi.array()
                    .items(HelpersSchema.baseIdNameSchema(true, true, rules.maxIdentityNameLength))
                    .min(1)
                    .max(rules.maxIdentityArrayLength)
                    .unique()
                    .required(),
                credentials: Joi.array()
                    .items(HelpersSchema.baseIdNameSchema(true, true, rules.maxCredentialsNameLength))
                    .min(1)
                    .max(rules.maxIdentityArrayLength)
                    .unique()
                    .optional(),
                yearOfExperience: Joi.number()
                    .positive()
                    .precision(1)
                    .max(100)
                    .required(),
            });
    }
}
