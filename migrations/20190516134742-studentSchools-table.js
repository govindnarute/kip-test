'use strict';

module.exports = {
    up(queryInterface) {
        const createSocialsTableSql = `
        CREATE TABLE IF NOT EXISTS studentSchools (
            id INTEGER AUTO_INCREMENT,
            
            userId INTEGER NOT NULL, 
            schoolId INTEGER NOT NULL, 
            degreeId INTEGER NULL, 
            locationId INTEGER NULL,
            fieldOfStudyId INTEGER NULL,
            isCurrent BOOLEAN NOT NULL DEFAULT false,
            
            fromYear YEAR(4) NULL,
            toYear YEAR(4) NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY user (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY school (schoolId) REFERENCES schools (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY degree (degreeId) REFERENCES degrees (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY location (locationId) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY fieldOfStudy (fieldOfStudyId) REFERENCES fieldsOfStudy (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createSocialsTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('studentSchools');
    }
};
