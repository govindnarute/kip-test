'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'degrees.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM degrees;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const locations = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('degrees', locations);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM degrees;');
    }
};
