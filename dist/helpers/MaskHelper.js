'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MaskHelper = undefined;

var _users = require('../resources/users');

class MaskHelper {

    /**
     * Set mask by flags
     * @param {Object} flags
     * @return {number}
     */
    static setMask(flags) {
        let mask = 0;

        _users.identityMask.forEach(item => {
            if (flags[item.flag] === true) {
                mask += item.mask;
            }
        });

        return mask;
    }

    /**
     * Parse identity bit mask and return flags
     * @param {number} value
     * @return {Object}
     */
    static parseMaskToFlags(value) {
        const result = Object.assign({}, _users.defaultIdentityFlags);

        _users.identityMask.forEach(item => {
            if ((value & item.mask) !== 0) {
                result[item.flag] = true;
            }
        });

        return result;
    }
}
exports.MaskHelper = MaskHelper;
//# sourceMappingURL=MaskHelper.js.map