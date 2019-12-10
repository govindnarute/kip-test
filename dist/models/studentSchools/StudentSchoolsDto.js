'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StudentSchoolsDto = undefined;

var _StudentSchoolDto = require('./StudentSchoolDto');

class StudentSchoolsDto {
    /**
     * @param {array} studentSchools
     */
    constructor(studentSchools) {

        /**
         * @type {object}
         */
        if (studentSchools.length) {
            this.data = studentSchools.map(studentSchool => new _StudentSchoolDto.StudentSchoolDto(studentSchool));
        } else {
            this.data = [];
        }
    }

    static get schema() {
        return {
            title: 'StudentSchoolsSchema',
            type: 'object',
            required: ['data'],
            properties: {
                data: {
                    type: 'array',
                    items: _StudentSchoolDto.StudentSchoolDto.schema
                }
            }
        };
    }
}
exports.StudentSchoolsDto = StudentSchoolsDto;
//# sourceMappingURL=StudentSchoolsDto.js.map