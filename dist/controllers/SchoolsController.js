'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('../utils/http');

var _studentSchools = require('../models/studentSchools');

class SchoolsController {
    constructor({ UserSchoolsService, DBConnection }) {
        this.userSchoolsService = UserSchoolsService;
        this.dbConnection = DBConnection;
        this.StudentSchool = DBConnection.model('StudentSchool');
        this.School = DBConnection.model('School');
        this.Degree = DBConnection.model('Degree');
        this.FieldOfStudy = DBConnection.model('FieldOfStudy');
        this.Location = DBConnection.model('Location');
    }

    async createSchools(request) {
        for (let item = 0; item < request.body.length; item++) {
            if (request.body[item].fromYear && request.body[item].toYear && request.body[item].fromYear > request.body[item].toYear) {
                throw new _http.BadRequestError('TO_YEAR_VALIDATION_ERROR', 'VALIDATION_ERROR');
            }
        }

        /*
        Get array with already existing data.
        Check if school exist and id is not nullable
        Check if optional field is not exist OR it has not nullable id
         */
        let existingData = request.body.filter(item => item.school && item.school.id && (!item.degree || item.degree && item.degree.id) && (!item.fieldOfStudy || item.fieldOfStudy && item.fieldOfStudy.id));

        // Check if autocomplete field with ids exist
        const existingSchools = request.body.filter(item => item.school && item.school.id);
        if (existingSchools.length) {
            await this.userSchoolsService.checkExistingIds(this.School, existingSchools, 'school', 'SCHOOL_NOT_FOUND');
        }

        const existingDegrees = request.body.filter(item => item.degree && item.degree.id);
        if (existingDegrees.length) {
            await this.userSchoolsService.checkExistingIds(this.Degree, existingDegrees, 'degree', 'DEGREE_NOT_FOUND');
        }

        const existingFieldOfStudy = request.body.filter(item => item.fieldOfStudy && item.fieldOfStudy.id);
        if (existingFieldOfStudy.length) {
            await this.userSchoolsService.checkExistingIds(this.FieldOfStudy, existingFieldOfStudy, 'fieldOfStudy', 'FIELD_OF_STUDY_NOT_FOUND');
        }

        const existingLocation = request.body.filter(item => item.location && item.location.id);
        if (existingLocation.length) {
            await this.userSchoolsService.checkExistingIds(this.Location, existingLocation, 'location', 'LOCATION_NOT_FOUND');
        }

        //Get new autocomplete data for saving
        const newData = request.body.filter(item => item.school && item.school.id === null || item.degree && item.degree.id === null || item.fieldOfStudy && item.fieldOfStudy.id === null);
        if (Array.isArray(newData) && newData.length) {
            let savedData;

            // Check all nullable field and save new autocomplete data
            for (const [index, value] of newData.entries()) {
                if (value.school && !value.school.id) {
                    savedData = await this.userSchoolsService.getOrSaveAutocompleteData(this.School, value.school.name);
                    newData[index].school.id = savedData.id;
                }

                if (value.degree && !value.degree.id) {
                    savedData = await this.userSchoolsService.getOrSaveAutocompleteData(this.Degree, value.degree.name);
                    newData[index].degree.id = savedData.id;
                }

                if (value.fieldOfStudy && !value.fieldOfStudy.id) {
                    savedData = await this.userSchoolsService.getOrSaveAutocompleteData(this.FieldOfStudy, value.fieldOfStudy.name);
                    newData[index].fieldOfStudy.id = savedData.id;
                }
            }

            // Concat already existing data with new data
            existingData = existingData.concat(newData);
        }

        // Map all data for saving
        const dataForSave = existingData.map(item => ({
            userId: request.user.userId,
            schoolId: item.school.id,
            degreeId: item.degree ? item.degree.id : null,
            fieldOfStudyId: item.fieldOfStudy ? item.fieldOfStudy.id : null,
            locationId: item.location ? item.location.id : null,
            isCurrent: item.isCurrent || false,
            fromYear: item.fromYear || null,
            toYear: item.toYear || null
        }));

        // Delete old user school data
        await this.userSchoolsService.deleteStudentSchoolsByUserId(request.user.userId);

        // Save new user school data
        await this.userSchoolsService.bulkCreateStudentSchool(dataForSave);
        const userSchools = await this.userSchoolsService.getStudentSchoolsByUserId(request.user.userId);

        return new _studentSchools.StudentSchoolsDto(userSchools);
    }
}
exports.default = SchoolsController;
//# sourceMappingURL=SchoolsController.js.map