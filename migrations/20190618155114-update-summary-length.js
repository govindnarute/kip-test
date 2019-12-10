'use strict';

module.exports = {
    up(queryInterface) {
        const alterUserCompensationsTableSql = `
        ALTER TABLE users
            MODIFY COLUMN summary VARCHAR(3000) NULL AFTER headline;
        `.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(alterUserCompensationsTableSql);
    },
    down(queryInterface) {
        const alterUserCompensationsTableSql = `
        ALTER TABLE users
            MODIFY COLUMN summary VARCHAR(1000) NULL AFTER headline; 
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterUserCompensationsTableSql);
    }
};
