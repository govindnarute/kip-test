'use strict';

module.exports = {
    up(queryInterface) {
        const alterUsersTableSql = `
        ALTER TABLE users
            ADD COLUMN isFirstEnter BOOLEAN DEFAULT true AFTER identities;
        `.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(alterUsersTableSql);
    },
    down(queryInterface) {
        const alterBackUsersTableSql = `
        ALTER TABLE users
            DROP COLUMN isFirstEnter;
        `.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(alterBackUsersTableSql);
    }
};
