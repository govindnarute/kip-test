import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { rules } from '../resources/users';
import { HelpersSchema } from './HelpersSchema';

export default class UserProfessionalSchema extends AppSchema {

    get body() {
        const date = new Date();
        const currentYear = date.getFullYear();

        return Joi.object()
            .keys({
                industries: Joi.array()
                    .items(HelpersSchema.baseIdNameSchema(false, false, rules.maxIdentityNameLength))
                    .min(1)
                    .max(rules.maxIdentityArrayLength)
                    .unique()
                    .required(),
                functions: Joi.array()
                    .items(HelpersSchema.baseIdNameSchema(false, false, rules.maxIdentityNameLength))
                    .min(1)
                    .max(rules.maxIdentityArrayLength)
                    .unique()
                    .required(),
                yearOfExperience: Joi.number()
                    .positive()
                    .precision(1)
                    .max(100)
                    .required(),
                companies: Joi.array()
                    .items({
                        title: Joi.string()
                            .max(rules.maxIdentityNameLength)
                            .trim()
                            .required(),
                        company: HelpersSchema.baseIdNameSchema(true, true, rules.maxIdentityNameLength),
                        location: Joi.object()
                            .keys({
                                id: Joi.number()
                                    .integer()
                                    .positive()
                                    .required()
                                    .options({
                                        language: {
                                            number: {
                                                base: 'id in location must be a number',
                                            }
                                        }

                                    }),
                                name: Joi.string().trim().required(),
                            })
                            .optional(),
                        fromDate: Joi.number()
                            .min(rules.fromYear)
                            .max(currentYear)
                            .allow(null)
                            .required(),
                        toDate: Joi.number()
                            .max(rules.toYear)
                            .allow(null)
                            .required(),
                        description: Joi.string()
                            .trim()
                            .max(rules.maxDescriptionLength)
                            .optional(),
                        isCurrent: Joi.boolean()
                            .required(),
                    })
                    .min(1)
                    .max(rules.maxIdentityArrayLength)
                    .unique()
                    .required(),
            });
    }
}
