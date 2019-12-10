'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'industries.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM industries;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const industries = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('industries', industries);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM industries;');
    }
};
