'use strict';

module.exports = {
    up(queryInterface) {
        const createSocialsTableSql = `
        CREATE TABLE IF NOT EXISTS socials (
            id INTEGER AUTO_INCREMENT,
            
            userId INTEGER NOT NULL, 
            type TINYINT NOT NULL COMMENT 'Identifier social network: 1 - linkedIn',
            socialUserId VARCHAR(255) NOT NULL, 
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY user (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createSocialsTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('socials');
    }
};
