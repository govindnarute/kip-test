'use strict';

module.exports = {
    up(queryInterface) {
        const createFunctionsTableSql = `
        CREATE TABLE IF NOT EXISTS functions (
            id INTEGER AUTO_INCREMENT,
            
            name VARCHAR(50) NOT NULL, 
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createFunctionsTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('functions');
    }
};
