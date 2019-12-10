"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * At least one capital letter, one number only latin letters spaces are allowed and special
 * symbols like [!@#$%^&*()?/|] allowed.
 * @type {RegExp}
 */
const PasswordRegExp = exports.PasswordRegExp = /^(\s*)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()?/|]?)(?=.\S)(?=.*\d).+$/;
//# sourceMappingURL=RegExp.js.map