'use strict';

module.exports = {
    up(queryInterface) {
        const alterUsersTableSql = `
        ALTER TABLE users             
            ADD COLUMN headline VARCHAR(50) NULL AFTER isVerified,
            ADD COLUMN summary VARCHAR(1000) NULL AFTER headline;
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterUsersTableSql);
    },
    down(queryInterface) {
        const alterUsersTableSql = `
        ALTER TABLE users        
            DROP COLUMN headline,
            DROP COLUMN summary;
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterUsersTableSql);
    }
};
