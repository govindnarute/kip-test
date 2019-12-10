import { StudentSchoolDto } from './StudentSchoolDto';

export class StudentSchoolsDto {
    /**
     * @param {array} studentSchools
     */
    constructor(studentSchools) {

        /**
         * @type {object}
         */
        if(studentSchools.length) {
            this.data = studentSchools.map(studentSchool => new StudentSchoolDto(studentSchool));
        } else {
            this.data = [];
        }
    }

    static get schema() {
        return {
            title: 'StudentSchoolsSchema',
            type: 'object',
            required: [
                'data',
            ],
            properties: {
                data: {
                    type: 'array',
                    items: StudentSchoolDto.schema
                }
            }
        };
    }
}
