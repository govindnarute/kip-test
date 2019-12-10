'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'credentials.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM credentials;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const credentials = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('credentials', credentials);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM credentials;');
    }
};
