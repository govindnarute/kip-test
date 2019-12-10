'use strict';

module.exports = {
    up(queryInterface) {
        const createCoachExpertiseTableSql = `
        CREATE TABLE IF NOT EXISTS coachExpertise (
            id INTEGER AUTO_INCREMENT,
            
            userCoachId INTEGER NOT NULL,            
            expertiseId INTEGER NOT NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY userCoach (userCoachId) REFERENCES userCoaches (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY expertise (expertiseId) REFERENCES expertise (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createCoachExpertiseTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('coachExpertise');
    }
};
