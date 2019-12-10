'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestLoggerFactory = undefined;

var _uuid = require('uuid');

var uuid = _interopRequireWildcard(_uuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class RequestLoggerFactory {
    /**
     * @return {function(*, *, *)}
     */
    static getWriter({ WebLogger }) {
        return (req, res, next) => {
            const start = new Date();

            const request = {
                id: uuid.v4(),
                method: req.method,
                host: req.headers.host,
                userAgent: req.headers['user-agent'],
                headers: RequestLoggerFactory.getHeaders(req.headers)
            };

            WebLogger.log('trace', `❯❯❯ ${req.method.toUpperCase()} ${req.url}`, request);

            res.on('finish', () => {
                WebLogger.log('trace', `❮❮❮ ${req.method.toUpperCase()} ${req.url}`, {
                    id: request.id,
                    duration: `${new Date().getTime() - start.getTime()} ms`,
                    headers: RequestLoggerFactory.getHeaders(res._headers)
                });
            });

            next();
        };
    }

    static getHeaders(headers) {
        const excludeHeaders = ['cookie'];
        const cachedHeaders = Object.assign({}, headers);
        excludeHeaders.forEach(key => delete cachedHeaders[key]);
        return cachedHeaders;
    }
}
exports.RequestLoggerFactory = RequestLoggerFactory;
//# sourceMappingURL=RequestLoggerFactory.js.map