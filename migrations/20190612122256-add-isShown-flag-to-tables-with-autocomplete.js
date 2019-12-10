'use strict';

const autocompleteTables = [
    'locations',
    'schools',
    'degrees',
    'fieldsOfStudy',
    'companies',
    'industries',
    'functions',
    'expertise',
    'credentials',
];

module.exports = {
    up(queryInterface) {
        const alterIsShownFlagSql = (tableName) => `
        ALTER TABLE ${tableName} 
            ADD COLUMN isShown BOOLEAN NOT NULL DEFAULT true AFTER name;
        `.replace(/\s+/ig, ' ').trim();

        return Promise.all(autocompleteTables.map(table => queryInterface.sequelize.query(alterIsShownFlagSql(table))));
    },
    down(queryInterface) {
        const alterIsShownFlagSql = (tableName) => `
        ALTER TABLE ${tableName} 
            DROP COLUMN isShown;
        `.replace(/\s+/ig, ' ').trim();

        return Promise.all(autocompleteTables.map(table => queryInterface.sequelize.query(alterIsShownFlagSql(table))));
    }
};
