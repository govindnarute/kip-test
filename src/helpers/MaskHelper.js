import { identityMask as Mask, defaultIdentityFlags as Flags } from '../resources/users';

export class MaskHelper {

    /**
     * Set mask by flags
     * @param {Object} flags
     * @return {number}
     */
    static setMask(flags) {
        let mask = 0;

        Mask.forEach((item) => {
            if (flags[item.flag] === true) {
                mask+=item.mask;
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
        const result = Object.assign({}, Flags);

        Mask.forEach((item) => {
            if ((value & item.mask) !== 0) {
                result[item.flag] = true;
            }
        });

        return result;
    }
}
