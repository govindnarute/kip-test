import i18n from 'i18n';

/**
 * LocaleService
 */
export default class LocaleService {

    constructor() {
        i18n.configure({
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
        return i18n.getLocale();
    }

    /**
     *
     * @returns string[] The list of available locale codes
     */
    getLocales() {
        return i18n.getLocales();
    }

    /**
     *
     * @param locale The locale to set. Must be from the list of available i18n.
     */
    setLocale(locale) {
        if (this.getLocales().indexOf(locale) !== -1) {
            i18n.setLocale(locale);
        }
    }

    /**
     *
     * @param string String to translate
     * @param args Extra parameters
     * @returns {string} Translated string
     */
    translate(string, args = undefined) {
        return i18n.__(string, args);
    }

    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     */
    translatePlurals(phrase, count) {
        return i18n.__n(phrase, count);
    }
}
