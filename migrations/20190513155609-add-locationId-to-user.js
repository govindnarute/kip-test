'use strict';

module.exports = {
    up(queryInterface) {
        const createLocationsTableSql = `
        ALTER TABLE users 
            ADD COLUMN locationId INT NULL DEFAULT NULL AFTER summary,
            ADD CONSTRAINT FkLocationId 
            FOREIGN KEY location (locationId) REFERENCES locations (id) 
            ON DELETE SET NULL ON UPDATE CASCADE;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createLocationsTableSql);
    },
    down(queryInterface) {
        const alterUsersTableSql = `
            ALTER TABLE users
            DROP FOREIGN KEY FkLocationId,
            DROP locationId`;

        return queryInterface.sequelize.query(alterUsersTableSql);
    }
};
