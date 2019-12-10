import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { rules } from '../resources/users';
import { HelpersSchema } from './HelpersSchema';

export default class UserSchoolSchema extends AppSchema {

    get body() {
        const date = new Date();
        const currentYear = date.getFullYear();

        return Joi.object()
            .keys({
                school: HelpersSchema.baseIdNameSchema(true, true, rules.maxSchoolNameLength),
                degree: HelpersSchema.baseIdNameSchema(false, true, rules.maxIdentityNameLength),
                fieldOfStudy: HelpersSchema.baseIdNameSchema(false, true, rules.maxIdentityNameLength),
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
                fromYear: Joi.number()
                    .integer()
                    .positive()
                    .min(rules.fromYear)
                    .max(currentYear)
                    .optional(),
                toYear: Joi.number()
                    .integer()
                    .positive()
                    .max(rules.toYear)
                    .optional(),
                isCurrent: Joi.boolean()
                    .required(),
            });
    }
}
