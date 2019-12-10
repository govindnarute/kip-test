'use strict';

module.exports = {
    up(queryInterface) {
        const alterUsersTableSql = `
        ALTER TABLE users             
            ADD COLUMN identities TINYINT UNSIGNED NULL DEFAULT 0 AFTER locationId;
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterUsersTableSql);
    },
    down(queryInterface) {
        const alterUsersTableSql = `
        ALTER TABLE users        
            DROP COLUMN identities;
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterUsersTableSql);
    }
};
