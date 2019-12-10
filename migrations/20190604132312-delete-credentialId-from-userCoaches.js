'use strict';

module.exports = {
    up(queryInterface) {
        const alterUserCoachesTableSql = `
        ALTER TABLE userCoaches
          DROP FOREIGN KEY userCoaches_ibfk_2;
        `.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(alterUserCoachesTableSql)
            .then(() => queryInterface.sequelize.query('ALTER TABLE userCoaches DROP COLUMN credentialId;'));
    },
    down(queryInterface) {
        const alterUserCoachesTableSql = `
        ALTER TABLE userCoaches
          ADD COLUMN credentialId INTEGER NULL AFTER yearOfExperience,
          ADD CONSTRAINT userCoaches_ibfk_2 
            FOREIGN KEY credential (credentialId) 
            REFERENCES credentials (id) 
            ON DELETE CASCADE ON UPDATE CASCADE;
        `.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(alterUserCoachesTableSql);
    }
};
