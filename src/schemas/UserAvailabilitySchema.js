import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { userAvailabilityTypes } from '../resources/users';

export default class UserAvailabilitySchema extends AppSchema {

    get body() {
        const allowedId = userAvailabilityTypes.map(item => item.id);

        return Joi.object()
            .keys({
                connections: Joi.number()
                    .integer()
                    .min(0)
                    .max(10)
                    .allow(null)
                    .required(),
                availableFor: Joi.object()
                    .keys({
                        id: Joi.number()
                            .integer()
                            .valid(allowedId)
                            .required(),
                        name: Joi.string()
                            .trim()
                            .required(),
                    })
                    .required(),
            });
    }
}
