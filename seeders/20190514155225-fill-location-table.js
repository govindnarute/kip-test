'use strict';
const SpreadsheetsParser = require('../dist/helpers/xlsxSpreadsheetsParser').SpreadsheetsParser;
const fileName = 'locations.xlsx';

module.exports = {
    up(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM locations;')
            .then(() => SpreadsheetsParser.parseXlsxFile(fileName)
                .then(result => {
                    const locations = result.map(item => ({ name: item.Name }));
                    return queryInterface.bulkInsert('locations', locations);
                }));
    },
    down(queryInterface) {
        return queryInterface.sequelize.query('DELETE FROM locations;');
    }
};
