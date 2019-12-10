'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimeoutCounterFactory = undefined;

var _http = require('../http');

class TimeoutCounterFactory {
    /**
     * @return {function(*, *, *)}
     */
    static startCounter({ config }) {
        return (req, res, next) => {
            setTimeout(() => {
                if (!res.finished) {
                    return next(new _http.GatewayTimeOutError());
                }
            }, config.server.timeOut);

            next();
        };
    }
}
exports.TimeoutCounterFactory = TimeoutCounterFactory;
//# sourceMappingURL=TimeoutCounterFactory.js.map