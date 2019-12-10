'use strict';

module.exports = {
    up(queryInterface) {
        const createCoachCredentialsTableSql = `
        CREATE TABLE IF NOT EXISTS coachCredentials (
            id INTEGER AUTO_INCREMENT,
            
            userCoachId INTEGER NOT NULL,            
            credentialId INTEGER NOT NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY userCoach (userCoachId) REFERENCES userCoaches (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY credential (credentialId) REFERENCES credentials (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createCoachCredentialsTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('coachCredentials');
    }
};
