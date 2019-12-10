'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const xlsx = require('xlsx');

class SpreadsheetsParser {
    static parseXlsxFile(file) {
        return new Promise((resolve, reject) => {
            const path = __dirname + `/../../files/${file}`;

            const workbook = xlsx.readFile(path);

            // check is sheet exist
            if (!workbook.SheetNames.length) {
                return reject('Sheets not found!');
            }

            // get first sheet
            const worksheet = workbook.Sheets[workbook.SheetNames[0]],
                  headers = {},
                  data = [];

            for (const cell in worksheet) {
                if (cell[0] === '!') continue;

                // parse out the column, row, and value
                const col = cell.substring(0, 1);
                const row = parseInt(cell.substring(1));
                const value = worksheet[cell].v;

                // store header names
                if (row === 1 && value) {
                    headers[col] = value;
                    continue;
                }

                if (!data[row]) data[row] = {};
                data[row][headers[col]] = value;
            }
            // drop those first two rows which are empty
            data.shift();
            data.shift();

            return resolve(data);
        });
    }
}
exports.SpreadsheetsParser = SpreadsheetsParser;
//# sourceMappingURL=xlsxSpreadsheetsParser.js.map