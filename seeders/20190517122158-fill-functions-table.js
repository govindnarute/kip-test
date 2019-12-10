'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'functions.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM functions;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const functions = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('functions', functions);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM functions;');
    }
};
