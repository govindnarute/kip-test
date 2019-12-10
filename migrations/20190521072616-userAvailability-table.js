'use strict';

module.exports = {
    up(queryInterface) {
        const createUserAvailabilityTableSql = `
        CREATE TABLE IF NOT EXISTS userAvailability (
            id INTEGER AUTO_INCREMENT,
            
            userId INTEGER NOT NULL,   
            connections TINYINT NULL COMMENT 'if field is null, it means unlimited option',         
            availableFor TINYINT NOT NULL DEFAULT 1 COMMENT '1 - everyone,\n 2 - students,\n 3 - professionals,\n 4 - fromMySchool',
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY user (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createUserAvailabilityTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('userAvailability');
    }
};
