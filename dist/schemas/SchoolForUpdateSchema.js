'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppSchema = require('../utils/validation/AppSchema');

class SchoolForUpdateSchema extends _AppSchema.AppSchema {

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
exports.default = SchoolForUpdateSchema;
//# sourceMappingURL=SchoolForUpdateSchema.js.map