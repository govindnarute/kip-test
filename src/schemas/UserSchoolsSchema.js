import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class UserSchoolsSchema extends AppSchema {

    constructor({ UserSchoolSchema }) {
        super();
        this.userSchoolSchema = UserSchoolSchema;
    }

    get body() {
        const maxSchoolsLength = 10;

        return Joi.array()
            .items(this.userSchoolSchema.body)
            .max(maxSchoolsLength)
            .required();
    }
}
