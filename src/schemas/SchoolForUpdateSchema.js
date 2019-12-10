import { AppSchema } from '../utils/validation/AppSchema';

export default class SchoolForUpdateSchema extends AppSchema {

    constructor({ SchoolIdSchema, UserSchoolSchema }) {
        super();
        this.schoolIdSchema = SchoolIdSchema;
        this.userSchoolSchema = UserSchoolSchema;
    }

    get params() {
        return this.schoolIdSchema.params;
    }

    get body() {
        return this.userSchoolSchema.body;
    }

}
