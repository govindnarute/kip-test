'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorHandlerFactory = undefined;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _http = require('../http');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ErrorHandlerFactory {
    /**
     * @return {function(*=, *=, *, *)}
     */
    static errorHandler({ config, WebLogger, i18nService }) {
        return (err, req, res, next) => {

            if (!err) {
                return next();
            }

            if (req.file || req.files) {
                const files = req.files || [req.file];
                Object.keys(files).forEach(fileName => {
                    Array.isArray(files[fileName]) ? ErrorHandlerFactory.removeFiles(files[fileName]) : ErrorHandlerFactory.removeFile(files[fileName]);
                });
            }

            if (res.locals.transaction && !res.locals.transaction.finished) {
                res.locals.transaction.rollback();
            }

            if (!(err instanceof _http.CustomError)) {
                err = new _http.InternalServerError(err.message);
            }

            let httpStatusCode = err.httpStatusCode;
            if (err.response && err.response.status) {
                httpStatusCode = err.response.status;
            }

            const error = {
                code: err.code,
                message: i18nService.translate(err.message, err.options && err.options.translateOptions),
                context: err.options && err.options.context
            };

            if (!config.production) {
                error.stacktrace = err.stack && err.stack.split('\n');
            }

            WebLogger.error({ message: err });

            res.status(httpStatusCode).json({
                __v: ErrorHandlerFactory.retrieveVersion(req),
                error
            }).end();
        };
    }

    static removeFiles(files = []) {
        return files.forEach(ErrorHandlerFactory.removeFile);
    }

    static removeFile(file) {
        fs.unlinkSync(file.path);
    }

    static retrieveVersion(request, version) {
        if (request.params.version) {
            version = parseInt(request.params.version.replace('v', ''));
        } else {
            version = parseInt(request.url.match(/\d+/));
        }
        return version ? version.toFixed(1) : '0.0';
    }
}
exports.ErrorHandlerFactory = ErrorHandlerFactory;
//# sourceMappingURL=ErrorHandlerFactory.js.map