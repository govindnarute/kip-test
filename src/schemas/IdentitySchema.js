import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class IdentitySchema extends AppSchema {

    identities() {
        return {
            identities: Joi
                .object()
                .keys({
                    isStudent: Joi
                        .boolean()
                        .required(),
                    isAlum: Joi
                        .boolean()
                        .required(),
                    isProfessional: Joi
                        .boolean()
                        .required(),
                    isCoach: Joi
                        .boolean()
                        .required(),
                })
                .required(),
        };
    }
}
