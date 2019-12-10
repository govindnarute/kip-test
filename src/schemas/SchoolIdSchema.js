import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class SchoolIdSchema extends AppSchema {

    get params() {
        return Joi.object()
            .keys({
                schoolId: Joi
                    .number()
                    .integer()
                    .positive()
                    .required()
            })
            .concat(super.params);
    }

}
