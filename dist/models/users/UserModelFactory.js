'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserModelFactory = undefined;

var _UserDto = require('./UserDto');

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

var _password = require('../../utils/hooks/password');

var _UserTypes = require('../../resources/users/UserTypes');

var _SocialTypes = require('../../resources/socials/SocialTypes');

/**
 * @typedef {Object} UserInstanceAttributes
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {number} isVerified
 * @property {string} headline
 * @property {string} summary
 * @property {number} identities
 * @property {string} password
 * @property {string} salt
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<UserInstanceAttributes>} UserInstance
 */

/**
 * @typedef {sequelize.Model<UserInstance, UserInstanceAttributes>} UserModel
 */

class UserModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UserModel}
     */
    static define(sequelize) {
        /**
         * @type {UserModel}
         */
        const User = sequelize.define('User', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({
            email: {
                type: sequelize.Sequelize.STRING(129),
                allowNull: true
            },

            firstName: {
                type: sequelize.Sequelize.STRING(255),
                allowNull: true
            },

            lastName: {
                type: sequelize.Sequelize.STRING(255),
                allowNull: true
            },

            type: {
                type: sequelize.Sequelize.TINYINT,
                defaultValue: _UserTypes.userTypes.seeker,
                allowNull: false
            },

            isVerified: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },

            headline: {
                type: sequelize.Sequelize.STRING(50),
                allowNull: true
            },

            summary: {
                type: sequelize.Sequelize.STRING(3000),
                allowNull: true
            },

            locationId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true
            },

            identities: {
                type: sequelize.Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true
            },

            password: {
                type: sequelize.Sequelize.STRING(255),
                allowNull: true
            },

            salt: {
                type: sequelize.Sequelize.STRING(255),
                allowNull: true
            },

            isFirstEnter: {
                type: sequelize.Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('users'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {
                withTokenByType: type => ({
                    include: [{
                        model: sequelize.model('VerificationToken'),
                        as: 'verificationToken',
                        required: false,
                        where: {
                            type
                        }
                    }]
                }),
                withSocial: (type = _SocialTypes.socialTypes.linkedIn) => ({
                    include: [{
                        model: sequelize.model('Social'),
                        as: 'social',
                        required: false,
                        where: {
                            type
                        }
                    }]
                }),
                withAvatar: () => ({
                    include: [{
                        model: sequelize.model('Image'),
                        as: 'avatar'
                    }]
                }),
                withLocation: () => ({
                    include: [{
                        model: sequelize.model('Location'),
                        as: 'location',
                        required: false
                    }]
                }),
                withStudentSchool: () => ({
                    include: [{
                        model: sequelize.model('StudentSchool'),
                        as: 'studentSchool',
                        include: [{
                            model: sequelize.model('School'),
                            as: 'school'
                        }, {
                            model: sequelize.model('Degree'),
                            as: 'degree'
                        }, {
                            model: sequelize.model('Location'),
                            as: 'location'
                        }, {
                            model: sequelize.model('FieldOfStudy'),
                            as: 'fieldOfStudy'
                        }]
                    }]
                }),
                withUserProfessional: () => ({
                    include: [{
                        model: sequelize.model('UserProfessional'),
                        as: 'userProfessional',
                        include: [{
                            model: sequelize.model('Industry'),
                            as: 'industry',
                            through: {
                                attributes: []
                            }
                        }, {
                            model: sequelize.model('Function'),
                            as: 'function',
                            through: {
                                attributes: []
                            }
                        }, {
                            model: sequelize.model('ProfessionalCompany'),
                            as: 'professionalCompany',
                            include: [{
                                model: sequelize.model('Company'),
                                as: 'company'
                            }, {
                                model: sequelize.model('Location'),
                                as: 'location'
                            }]
                        }]
                    }]
                }),
                withUserCoach: () => ({
                    include: [{
                        model: sequelize.model('UserCoach'),
                        as: 'userCoach',
                        include: [{
                            model: sequelize.model('Expertise'),
                            as: 'expertise',
                            through: {
                                attributes: []
                            }
                        }, {
                            model: sequelize.model('Credential'),
                            as: 'credential',
                            required: false
                        }]
                    }]
                }),
                withUserCompensation: () => ({
                    include: [{
                        model: sequelize.model('UserCompensations'),
                        as: 'userCompensation'
                    }]
                }),
                withUserAvailability: () => ({
                    include: [{
                        model: sequelize.model('UserAvailability'),
                        as: 'userAvailability'
                    }]
                })
            }),
            hooks: {
                beforeCreate: [_password.PasswordHooks.beforeCreate],
                beforeUpdate: [_password.PasswordHooks.beforeUpdate]
            }
        }));

        /**
         * @this {UserModel}
         */
        User.associate = function () {
            this.hasOne(sequelize.model('VerificationToken'), {
                foreignKey: 'userId',
                as: 'verificationToken'
            });
            this.hasOne(sequelize.model('Social'), {
                foreignKey: 'userId',
                as: 'social'
            });
            this.belongsToMany(sequelize.model('Image'), {
                through: sequelize.model('UsersImage'),
                foreignKey: 'userId',
                otherKey: 'imageId',
                as: 'avatar'
            });
            this.belongsTo(sequelize.model('Location'), {
                foreignKey: 'locationId',
                as: 'location'
            });
            this.hasMany(sequelize.model('StudentSchool'), {
                foreignKey: 'userId',
                as: 'studentSchool'
            });
            this.hasOne(sequelize.model('UserProfessional'), {
                foreignKey: 'userId',
                as: 'userProfessional'
            });
            this.hasOne(sequelize.model('UserCoach'), {
                foreignKey: 'userId',
                as: 'userCoach'
            });
            this.hasOne(sequelize.model('UserCompensations'), {
                foreignKey: 'userId',
                as: 'userCompensation'
            });
            this.hasOne(sequelize.model('UserAvailability'), {
                foreignKey: 'userId',
                as: 'userAvailability'
            });
        };

        /**
         * @this {UserInstance}
         */
        User.prototype.toDto = function toDto() {
            return new _UserDto.UserDto(this);
        };

        return User;
    }
}
exports.UserModelFactory = UserModelFactory;
//# sourceMappingURL=UserModelFactory.js.map