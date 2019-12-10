'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'companies.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM companies;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const companies = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('companies', companies);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM companies;');
    }
};
