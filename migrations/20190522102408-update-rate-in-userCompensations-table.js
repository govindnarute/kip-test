'use strict';

module.exports = {
    up(queryInterface) {
        const alterUserCompensationsTableSql = `
        ALTER TABLE userCompensations
            MODIFY COLUMN rate SMALLINT UNSIGNED NULL DEFAULT 0;
        `.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(alterUserCompensationsTableSql);
    },
    down(queryInterface) {
        const alterUserCompensationsTableSql = `
        ALTER TABLE userCompensations
            MODIFY COLUMN rate INTEGER NOT NULL; 
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterUserCompensationsTableSql);
    }
};
