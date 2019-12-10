'use strict';

module.exports = {
    up(queryInterface) {
        const createProfessionalFunctionsTableSql = `
        CREATE TABLE IF NOT EXISTS professionalFunctions (
            id INTEGER AUTO_INCREMENT,
            
            userProfessionalId INTEGER NOT NULL,            
            functionId INTEGER NOT NULL,
    
            createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY userProfessional (userProfessionalId) REFERENCES userProfessionals (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY function (functionId) REFERENCES functions (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (id)
        ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(createProfessionalFunctionsTableSql);
    },
    down(sequelizeInterface) {
        return sequelizeInterface.dropTable('professionalFunctions');
    }
};
