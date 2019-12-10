'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class LocaleFactory {
    /**
     * @return {function(*, *, *)}
     */
    static setLocale({ i18nService }) {
        return (req, res, next) => {
            if (!req.headers['accept-language'] || req.headers['accept-language'] === '*') {
                return next();
            }
            if (req.headers['accept-language'].split('-')[1]) {
                i18nService.setLocale(req.headers['accept-language'].split('-')[0]);
                return next();
            }
            i18nService.setLocale(req.headers['accept-language']);
            next();
        };
    }
}
exports.LocaleFactory = LocaleFactory;
//# sourceMappingURL=LocaleFactory.js.map