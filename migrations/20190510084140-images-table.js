'use strict';

module.exports = {
    up(queryInterface) {
        const createImagesTableSql = `
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER AUTO_INCREMENT,
            
            authorId INTEGER NOT NULL, 
            
            name  VARCHAR(255) NOT NULL,
            status TINYINT NOT NULL DEFAULT 1 COMMENT '1 - pending, 2 - loaded',        
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createImagesTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('images');
    }
};
