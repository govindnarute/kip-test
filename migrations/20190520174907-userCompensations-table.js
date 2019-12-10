'use strict';

module.exports = {
    up(queryInterface) {
        const createUserCompensationsTableSql = `
        CREATE TABLE IF NOT EXISTS userCompensations (
            id INTEGER AUTO_INCREMENT,
            
            userId INTEGER NOT NULL,   
            isCompensationRequire BOOLEAN NOT NULL DEFAULT false,         
            hideCompensation BOOLEAN NOT NULL DEFAULT false,         
            rate INTEGER NOT NULL,
            notes VARCHAR(255) NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY user (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createUserCompensationsTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('userCompensations');
    }
};
