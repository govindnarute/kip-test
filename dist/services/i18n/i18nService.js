'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LocaleService
 */
class LocaleService {

    constructor() {
        _i18n2.default.configure({
            locales: ['en'],
            defaultLocale: 'en',
            directory: __dirname + '/../../../locales',
            autoReload: false,
            updateFiles: false,
            indent: '    '
        });
    }

    /**
     *
     * @returns {string} The current locale code
     */
    getCurrentLocale() {
        return _i18n2.default.getLocale();
    }

    /**
     *
     * @returns string[] The list of available locale codes
     */
    getLocales() {
        return _i18n2.default.getLocales();
    }

    /**
     *
     * @param locale The locale to set. Must be from the list of available i18n.
     */
    setLocale(locale) {
        if (this.getLocales().indexOf(locale) !== -1) {
            _i18n2.default.setLocale(locale);
        }
    }

    /**
     *
     * @param string String to translate
     * @param args Extra parameters
     * @returns {string} Translated string
     */
    translate(string, args = undefined) {
        return _i18n2.default.__(string, args);
    }

    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     */
    translatePlurals(phrase, count) {
        return _i18n2.default.__n(phrase, count);
    }
}
exports.default = LocaleService;
//# sourceMappingURL=i18nService.js.map