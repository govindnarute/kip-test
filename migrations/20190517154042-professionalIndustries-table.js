'use strict';

module.exports = {
    up(queryInterface) {
        const createProfessionalIndustriesTableSql = `
        CREATE TABLE IF NOT EXISTS professionalIndustries (
            id INTEGER AUTO_INCREMENT,
            
            userProfessionalId INTEGER NOT NULL,            
            industryId INTEGER NOT NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY userProfessional (userProfessionalId) REFERENCES userProfessionals (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY industry (industryId) REFERENCES industries (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createProfessionalIndustriesTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('professionalIndustries');
    }
};
