import { NotFoundError } from '../../utils/http';

export default class UserSchoolsService {
    constructor({ DBConnection }) {
        this.dbConnection = DBConnection;
        this.StudentSchool = DBConnection.model('StudentSchool');
        this.School = DBConnection.model('School');

        this.fullScope = ['withUser', 'withSchool', 'withDegree', 'withLocation', 'withFieldOfStudy'];
    }

    /**
     * Count by ids
     * @param {object} Model
     * @param {Array} ids
     * @param {Array} scopes
     * @returns {Promise}
     */
    async countByIds(Model, ids, scopes = []) {
        return Model
            .scope(scopes.concat({ method: ['byIds', ids] }))
            .count();
    }

    /**
     * Check if existing id array exist
     * @param {object} Model
     * @param {Array} existingArray
     * @param {string} field
     * @param {string} errorMessage
     * @returns {Promise}
     */
    async checkExistingIds(Model, existingArray, field, errorMessage) {
        let existingIds = existingArray.map(item => item[field].id);
        existingIds = Array.from(new Set(existingIds));

        const count = await this.countByIds(Model, existingIds);

        if (count !== existingIds.length) {
            throw new NotFoundError(errorMessage);
        }

    }

    /**
     * Get by name or save new autocomplete field bu name
     * @param {object} Model
     * @param {string} name
     * @returns {Promise}
     */
    async getOrSaveAutocompleteData(Model, name) {
        const item = await Model.findOne({ where: { name } });

        if (item) {
            return item;
        } else {
            return Model.create({
                name,
                isShown: false
            });
        }
    }

    /**
     * Delete StudentSchools by user id
     * @param {integer} userId
     * @returns {Promise}
     */
    async deleteStudentSchoolsByUserId(userId) {
        return this.StudentSchool.destroy({ where: { userId } });
    }

    /**
     * Bulk create student schools
     * @param data
     * @returns {Promise}
     */
    async bulkCreateStudentSchool(data) {
        return this.StudentSchool.bulkCreate(data);
    }

    /**
     * Get StudentSchool by user ID
     * @param userId
     * @returns {Promise}
     */
    async getStudentSchoolsByUserId(userId) {
        return this.StudentSchool
            .scope(this.fullScope)
            .findAll({
                where: { userId }
            });
    }
}
