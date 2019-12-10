'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileValidation = undefined;

var _BaseFileValidation = require('../../base/BaseFileValidation');

var _fileType = require('file-type');

var fileType = _interopRequireWildcard(_fileType);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _http = require('../http');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class FileValidation extends _BaseFileValidation.BaseFileValidation {
    static validate(field, maxSize, mimeTypes) {
        return (req, res, next) => {
            if (!req.files || !req.files[field]) {
                return next(new _http.BadRequestError());
            }

            if (req.files[field].size > maxSize) {
                return next(new _http.BadRequestError());
            }

            fs.readFileSync(req.files[field].path, (err, file) => {
                if (err) {
                    return next(err);
                }

                const type = fileType(file);
                if (type === null || mimeTypes.indexOf(type.mime) === -1) {
                    return next(new _http.BadRequestError());
                }

                res.locals.fileType = type.mime;
                next();
            });
        };
    }
}
exports.FileValidation = FileValidation;
//# sourceMappingURL=FileValidation.js.map