'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'schools.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM schools;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const locations = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('schools', locations);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM schools;');
    }
};
