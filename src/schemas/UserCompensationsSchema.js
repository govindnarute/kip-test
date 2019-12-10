import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { rules } from '../resources/users';

export default class UserCompensationsSchema extends AppSchema {

    get body() {
        return Joi.object()
            .keys({
                rate: Joi.number()
                    .integer()
                    .min(0)
                    .max(9999)
                    .allow('')
                    .required()
                    .when('isCompensationRequire', {
                        is: Joi.boolean().valid(false),
                        then: Joi.number().optional()
                    }),
                notes: Joi.string()
                    .max(rules.maxNotesLength)
                    .allow('')
                    .trim()
                    .optional(),
                isCompensationRequire: Joi.boolean()
                    .optional(),
                hideCompensation: Joi.boolean()
                    .optional()
            });
    }
}
