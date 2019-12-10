'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StudentSchoolDto = undefined;

var _BaseDto = require('./../../base/BaseDto');

var _BaseSchoolParamsDto = require('./BaseSchoolParamsDto');

/**
 * @extends BaseDto
 */
class StudentSchoolDto extends _BaseDto.BaseDto {
    /**
     * @param {StudentSchoolInstance} studentSchool
     */
    constructor(studentSchool) {
        super(studentSchool);

        /**
         * @type {number}
         */
        this.school = _BaseSchoolParamsDto.BaseSchoolParamsDto.baseModel(studentSchool.get('school'));

        /**
         * @type {number}
         */
        this.degree = _BaseSchoolParamsDto.BaseSchoolParamsDto.baseModel(studentSchool.get('degree'));

        /**
         * @type {number}
         */
        this.location = _BaseSchoolParamsDto.BaseSchoolParamsDto.baseModel(studentSchool.get('location'));

        /**
         * @type {number}
         */
        this.fieldOfStudy = _BaseSchoolParamsDto.BaseSchoolParamsDto.baseModel(studentSchool.get('fieldOfStudy'));

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
            allOf: [super.schema, {
                type: 'object',
                required: [],
                properties: {
                    school: _BaseSchoolParamsDto.BaseSchoolParamsDto.schema,
                    degree: _BaseSchoolParamsDto.BaseSchoolParamsDto.schema,
                    location: _BaseSchoolParamsDto.BaseSchoolParamsDto.schema,
                    fieldOfStudy: _BaseSchoolParamsDto.BaseSchoolParamsDto.schema,
                    isCurrent: {
                        type: 'boolean',
                        default: false
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
            }]
        };
    }
}
exports.StudentSchoolDto = StudentSchoolDto;
//# sourceMappingURL=StudentSchoolDto.js.map