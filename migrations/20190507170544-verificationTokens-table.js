'use strict';

module.exports = {
    up(queryInterface) {
        const createVerificationTokensTableSql = `
        CREATE TABLE IF NOT EXISTS verificationTokens (
            id INTEGER AUTO_INCREMENT,
            
            userId INTEGER NOT NULL,
            type TINYINT NOT NULL DEFAULT 1 COMMENT '1 - verification, 2 - password',
            isUsed BOOLEAN NOT NULL DEFAULT false,
            token VARCHAR(255) NOT NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY user (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createVerificationTokensTableSql);
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS verificationTokens;');
    }
};
