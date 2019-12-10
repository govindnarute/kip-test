'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'expertise.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM expertise;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const expertise = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('expertise', expertise);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM expertise;');
    }
};
