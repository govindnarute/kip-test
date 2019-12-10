import { BaseDto } from './../../base/BaseDto';
import { BaseSchoolParamsDto } from './BaseSchoolParamsDto';

/**
 * @extends BaseDto
 */
export class StudentSchoolDto extends BaseDto {
    /**
     * @param {StudentSchoolInstance} studentSchool
     */
    constructor(studentSchool) {
        super(studentSchool);

        /**
         * @type {number}
         */
        this.school = BaseSchoolParamsDto.baseModel(studentSchool.get('school'));

        /**
         * @type {number}
         */
        this.degree = BaseSchoolParamsDto.baseModel(studentSchool.get('degree'));

        /**
         * @type {number}
         */
        this.location = BaseSchoolParamsDto.baseModel(studentSchool.get('location'));

        /**
         * @type {number}
         */
        this.fieldOfStudy = BaseSchoolParamsDto.baseModel(studentSchool.get('fieldOfStudy'));

        /**
         * @type {boolean}
         */
        this.isCurrent = studentSchool.get('isCurrent');

        /**
         * @type {number}
         */
        this.fromYear = studentSchool.get('fromYear');

        /**
         * @type {number}
         */
        this.toYear = studentSchool.get('toYear');
    }

    static schoolArray(data) {
        if (!data.length) {
            return [];
        }

        return data.map(studentSchool => new StudentSchoolDto(studentSchool));
    }

    static get schema() {
        return {
            title: 'StudentSchoolSchema',
            type: 'object',
            allOf: [
                super.schema,
                {
                    type: 'object',
                    required: [
                    ],
                    properties: {
                        school: BaseSchoolParamsDto.schema,
                        degree: BaseSchoolParamsDto.schema,
                        location: BaseSchoolParamsDto.schema,
                        fieldOfStudy: BaseSchoolParamsDto.schema,
                        isCurrent: {
                            type: 'boolean',
                            default: false,
                        },
                        fromYear: {
                            type: 'number',
                            nullable: true,
                            example: 1
                        },
                        toYear: {
                            type: 'number',
                            nullable: true,
                            example: 1
                        }
                    }
                }
            ]
        };
    }
}
