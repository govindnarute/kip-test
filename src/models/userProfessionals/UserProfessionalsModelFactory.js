import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} UserProfessionalsInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<UserProfessionalsInstanceAttributes>} UserProfessionalsInstance
 */

/**
 * @typedef {sequelize.Model<UserProfessionalsInstance>} UserProfessionalsModel
 */

export class UserProfessionalsModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UserProfessionalsModel}
     */
    static define(sequelize) {
        /**
         * @type {UserProfessionalsModel}
         */
        const UserProfessional = sequelize.define(
            'UserProfessional',
            ModelDefinitionBuilder.properties({

                userId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                yearOfExperience: {
                    type: sequelize.Sequelize.FLOAT,
                    allowNull: false,
                }

            }),
            Object.assign(ModelDefinitionBuilder.options('userProfessionals'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                    withIndustry: () => ({
                        include: [
                            {
                                model: sequelize.model('Industry'),
                                as: 'industry',
                                through: {
                                    attributes: [],
                                }
                            }
                        ]
                    }),
                    withFunction: () => ({
                        include: [
                            {
                                model: sequelize.model('Function'),
                                as: 'function',
                                through: {
                                    attributes: [],
                                }
                            }
                        ]
                    }),
                    withProfessionalCompany: () => ({
                        include: [
                            {
                                model: sequelize.model('ProfessionalCompany'),
                                as: 'professionalCompany',
                                include: [
                                    {
                                        model: sequelize.model('Company'),
                                        as: 'company'
                                    },
                                    {
                                        model: sequelize.model('Location'),
                                        as: 'location'
                                    },
                                ]
                            }
                        ]
                    })
                }),
            })
        );

        UserProfessional.associate = function() {
            this.belongsToMany(
                sequelize.model('Industry'),
                {
                    through: sequelize.model('ProfessionalIndustry'),
                    foreignKey: 'userProfessionalId',
                    otherKey: 'industryId',
                    as: 'industry'
                }
            );

            this.belongsToMany(
                sequelize.model('Function'),
                {
                    through: sequelize.model('ProfessionalFunction'),
                    foreignKey: 'userProfessionalId',
                    otherKey: 'functionId',
                    as: 'function'
                }
            );
            this.hasMany(
                sequelize.model('ProfessionalCompany'),
                {
                    foreignKey: 'userProfessionalId',
                    as: 'professionalCompany'
                }
            );
        };

        return UserProfessional;
    }
}
