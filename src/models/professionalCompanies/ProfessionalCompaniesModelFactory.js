import { ModelDefinitionBuilder } from '../../base/ModelDefinitionBuilder';

/**
 * @typedef {Object} ProfessionalCompanyInstanceAttributes
 * @property {number} id
 * @property {number} userProfessionalId
 * @property {number} companyId
 * @property {number} locationId
 * @property {string} title
 * @property {string} description
 * @property {date} fromDate
 * @property {date} toDate
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<ProfessionalCompanyInstanceAttributes>} ProfessionalCompanyInstance
 */

/**
 * @typedef {sequelize.Model<ProfessionalCompanyInstance, ProfessionalCompanyInstanceAttributes>} ProfessionalCompanyModel
 */

export class ProfessionalCompaniesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {ProfessionalCompanyModel}
     */
    static define(sequelize) {
        /**
         * @type {ProfessionalCompanyModel}
         */
        const ProfessionalCompany = sequelize.define(
            'ProfessionalCompany',
            ModelDefinitionBuilder.properties({

                userProfessionalId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                companyId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: false,
                },

                locationId: {
                    type: sequelize.Sequelize.INTEGER,
                    allowNull: true,
                },

                title: {
                    type: sequelize.Sequelize.STRING(50),
                    allowNull: false,
                },

                description: {
                    type: sequelize.Sequelize.STRING(250),
                    allowNull: false,
                },

                isCurrent: {
                    type: sequelize.Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                },

                fromDate: {
                    type: sequelize.Sequelize.DATE,
                    allowNull: false,
                },

                toDate: {
                    type: sequelize.Sequelize.DATE,
                    allowNull: false,
                }

            }),
            Object.assign(ModelDefinitionBuilder.options('professionalCompanies'), {
                scopes: Object.assign(ModelDefinitionBuilder.scopes(), {
                    withCompany: () => ({
                        include: [
                            {
                                model: sequelize.model('Company'),
                                as: 'company'
                            },
                        ],
                    }),
                    withLocation: () => ({
                        include: [
                            {
                                model: sequelize.model('Location'),
                                as: 'location'
                            },
                        ],
                    })
                }),
                hooks: {
                }
            })
        );

        /**
         * @this {UserModel}
         */
        ProfessionalCompany.associate = function() {
            this.belongsTo(
                sequelize.model('Company'),
                {
                    foreignKey: 'companyId',
                    as: 'company'
                }
            );
            this.belongsTo(
                sequelize.model('Location'),
                {
                    foreignKey: 'locationId',
                    as: 'location'
                }
            );
        };

        return ProfessionalCompany;
    }
}
