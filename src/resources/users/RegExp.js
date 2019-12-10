/**
 * At least one capital letter, one number only latin letters spaces are allowed and special
 * symbols like [!@#$%^&*()?/|] allowed.
 * @type {RegExp}
 */
export const PasswordRegExp = /^(\s*)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()?/|]?)(?=.\S)(?=.*\d).+$/;
