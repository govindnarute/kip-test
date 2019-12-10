'use strict';

module.exports = {
    up(queryInterface) {
        const createUsersTableSql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER AUTO_INCREMENT,
            
            firstName VARCHAR(255) NULL,
            lastName VARCHAR(255) NULL,
            email VARCHAR(129) NOT NULL UNIQUE,
            type TINYINT NOT NULL DEFAULT 1 COMMENT '1 - seeker,\n 2 - provider,\n 3 - both',
            isVerified BOOLEAN NOT NULL DEFAULT false,
            password VARCHAR(255) NOT NULL,
            salt VARCHAR(255) NOT NULL, 
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createUsersTableSql);
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS users;');
    }
};
