'use strict';

module.exports = {
    up(queryInterface) {
        const createUserCoachesTableSql = `
        CREATE TABLE IF NOT EXISTS userCoaches (
            id INTEGER AUTO_INCREMENT,
            
            userId INTEGER NOT NULL,            
            yearOfExperience FLOAT(3,1) NOT NULL,
            credentialId INTEGER NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY user (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY credential (credentialId) REFERENCES credentials (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createUserCoachesTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('userCoaches');
    }
};
