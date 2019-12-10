const IS_INT = /^-?[0-9]+$/;

export class ObjectKeyComposer {
    /**
     * @param {string} name
     * @param {string|number} value
     * @return {string}
     */
    static createKey(name, value) {
        return `${name}[${value}]`;
    }

    /**
     * @param {string} key
     * @param {RegExp} regExp
     * @return {number|string|null}
     */
    static extract(key, regExp) {
        const res = key.match(regExp);

        if (!res || !res[1]) {
            return null;
        }

        if (!IS_INT.test(res[1])) {
            return res[1];
        }

        return parseInt(res[1], 10);
    }
}
