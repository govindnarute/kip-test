'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserCoachesModelFactory = undefined;

var _ModelDefinitionBuilder = require('../../base/ModelDefinitionBuilder');

/**
 * @typedef {Object} UserCoachesInstanceAttributes
 * @property {number} id
 * @property {string} name
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {sequelize.Instance<UserCoachesInstanceAttributes>} UserCoachesInstance
 */

/**
 * @typedef {sequelize.Model<UserCoachesInstance>} UserCoachesModel
 */

class UserCoachesModelFactory {
    /**
     * @param {sequelize.Sequelize} sequelize
     * @return {UserCoachesModel}
     */
    static define(sequelize) {
        /**
         * @type {UserCoachesModel}
         */
        const UserCoaches = sequelize.define('UserCoach', _ModelDefinitionBuilder.ModelDefinitionBuilder.properties({

            userId: {
                type: sequelize.Sequelize.INTEGER,
                allowNull: false
            },

            yearOfExperience: {
                type: sequelize.Sequelize.FLOAT,
                allowNull: false
            }

        }), Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.options('userCoaches'), {
            scopes: Object.assign(_ModelDefinitionBuilder.ModelDefinitionBuilder.scopes(), {
                withExpertise: () => ({
                    include: [{
                        model: sequelize.model('Expertise'),
                        as: 'expertise',
                        through: {
                            attributes: []
                        }
                    }]
                }),
                withCredential: () => ({
                    include: [{
                        model: sequelize.model('Credential'),
                        as: 'credential',
                        through: {
                            attributes: []
                        }
                    }]
                })
            })
        }));

        UserCoaches.associate = function () {
            this.belongsToMany(sequelize.model('Expertise'), {
                through: sequelize.model('CoachExpertise'),
                foreignKey: 'userCoachId',
                otherKey: 'expertiseId',
                as: 'expertise'
            });
            this.belongsToMany(sequelize.model('Credential'), {
                through: sequelize.model('CoachCredential'),
                foreignKey: 'userCoachId',
                otherKey: 'credentialId',
                as: 'credential'
            });
        };

        return UserCoaches;
    }
}
exports.UserCoachesModelFactory = UserCoachesModelFactory;
//# sourceMappingURL=UserCoachesModelFactory.js.map