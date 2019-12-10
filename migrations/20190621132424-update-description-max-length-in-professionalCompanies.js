'use strict';

module.exports = {
    up(queryInterface) {
        const alterProfessionalCompaniesTableSql = `
        ALTER TABLE professionalCompanies
            MODIFY COLUMN description VARCHAR(1500) NULL;
        `.replace(/\s+/ig, ' ').trim();

        return queryInterface.sequelize.query(alterProfessionalCompaniesTableSql);
    },
    down(queryInterface) {
        const alterProfessionalCompaniesTableSql = `
        ALTER TABLE professionalCompanies
            MODIFY COLUMN description VARCHAR(250) NULL; 
        `.replace(/\s+/ig, ' ').trim();
        return queryInterface.sequelize.query(alterProfessionalCompaniesTableSql);
    }
};
