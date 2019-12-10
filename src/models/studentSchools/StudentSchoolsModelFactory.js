import { Op } from 'sequelize';
import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';
import { StudentSchoolDto } from './StudentSchoolDto';

/**
 * @typedef {Object} StudentSchoolInstanceAttributes
 * @property {number} id
 * @property {number} userId
 * @property {number} schoolId
 * @property {number} degreeId
 * @property {number} locationId
 * @property {number} fieldOfStudyId
 * @property {boolean} isCurrent
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<StudentSchoolInstanceAttributes>} StudentSchoolInstance
 */

/**
 * @typedef {sequelize.Model<UserInstance, StudentSchoolInstanceAttributes>} StudentSchoolModel
 */

export class StudentSchoolsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {StudentSchoolModel}
     */
    static define(sequelize) {
        /**
         * @type {StudentSchoolModel}
         */
        const StudentSchool = sequelize.define(
            'StudentSchool',
            ModelDefinitionBuilder.properties({

                userId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                schoolId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                degreeId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                },

                locationId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                },

                fieldOfStudyId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                },

                isCurrent: {
                    type: sequelize.Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                },

                fromYear: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                },

                toYear: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                }

            }),
            Object.assign(ModelDefinitionBuilder.options('studentSchools'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                    withUser: () => ({
                        include: [
                            {
                                model: sequelize.model('User'),
                                as: 'user'
                            },
                        ],
                    }),
                    withSchool: () => ({
                        include: [
                            {
                                model: sequelize.model('School'),
                                as: 'school'
                            },
                        ],
                    }),
                    withDegree: () => ({
                        include: [
                            {
                                model: sequelize.model('Degree'),
                                as: 'degree',
                            },
                        ],
                    }),
                    withLocation: () => ({
                        include: [
                            {
                                model: sequelize.model('Location'),
                                as: 'location',
                            },
                        ],
                    }),
                    withFieldOfStudy: () => ({
                        include: [
                            {
                                model: sequelize.model('FieldOfStudy'),
                                as: 'fieldOfStudy',
                            },
                        ],
                    }),
                    byIds: (ids = []) => ({
                        where: {
                            id: {
                                [Op.in]: ids
                            }
                        }
                    }),
                    byUserId: (id) => ({
                        where: {
                            userId: id
                        }
                    })
                }),
                hooks: {
                }
            })
        );

        /**
         * @this {UserModel}
         */
        StudentSchool.associate = function() {
            this.belongsTo(
                sequelize.model('User'),
                {
                    foreignKey: 'userId',
                    as: 'user'
                }
            );
            this.belongsTo(
                sequelize.model('School'),
                {
                    foreignKey: 'schoolId',
                    as: 'school'
                }
            );
            this.belongsTo(
                sequelize.model('Degree'),
                {
                    foreignKey: 'degreeId',
                    as: 'degree'
                }
            );
            this.belongsTo(
                sequelize.model('Location'),
                {
                    foreignKey: 'locationId',
                    as: 'location'
                }
            );
            this.belongsTo(
                sequelize.model('FieldOfStudy'),
                {
                    foreignKey: 'fieldOfStudyId',
                    as: 'fieldOfStudy'
                }
            );
        };

        /**
         * @this {UserInstance}
         */
        StudentSchool.prototype.toDto = function toDto() {
            return new StudentSchoolDto(this);
        };

        return StudentSchool;
    }
}
