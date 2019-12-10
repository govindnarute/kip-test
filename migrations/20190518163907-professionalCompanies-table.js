'use strict';

module.exports = {
    up(queryInterface) {
        const createProfessionalCompaniesTableSql = `
        CREATE TABLE IF NOT EXISTS professionalCompanies (
            id INTEGER AUTO_INCREMENT,
            
            userProfessionalId INTEGER NOT NULL, 
            companyId INTEGER NOT NULL,
            locationId INTEGER NULL,
            
            title VARCHAR(50) NOT NULL,
            description VARCHAR(250) NULL,
            isCurrent BOOLEAN NOT NULL DEFAULT false,
            fromDate DATE NOT NULL,
            toDate DATE NOT NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY userProfessional (userProfessionalId) REFERENCES userProfessionals (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY company (companyId) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY location (locationId) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createProfessionalCompaniesTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('professionalCompanies');
    }
};
