"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @type {{minPasswordLength: number, maxPasswordLength: number}}
 */
const rules = exports.rules = {
    minPasswordLength: 8,
    maxPasswordLength: 50,
    minNameLength: 1,
    maxNameLength: 50,
    minSummaryLength: 1,
    maxSummaryLength: 3000,

    fromYear: 1960,
    toYear: 2026,
    maxIdentityArrayLength: 20,
    maxIdentityNameLength: 50,
    maxSchoolNameLength: 100,
    maxCredentialsNameLength: 100,
    maxDescriptionLength: 1500,
    maxNotesLength: 250
};

const maxAttempts = exports.maxAttempts = 5;
//# sourceMappingURL=ValidationRules.js.map