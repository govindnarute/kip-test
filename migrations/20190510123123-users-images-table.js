'use strict';

module.exports = {
    up(queryInterface) {
        const createUsersImagesTableSql = `
        CREATE TABLE IF NOT EXISTS usersImages (
            id INTEGER AUTO_INCREMENT,
            
            userId INTEGER NULL,
            imageId INTEGER NOT NULL,    
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY user (userId) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
            FOREIGN KEY image (imageId) REFERENCES images (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createUsersImagesTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('usersImages');
    }
};
