'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @type {{student: number, alum: number, teacher: number, coach: number}}
 */

const identityMask = exports.identityMask = [{
    name: 'Student',
    flag: 'isStudent',
    mask: 1
}, {
    name: 'Alum',
    flag: 'isAlum',
    mask: 2
}, {
    name: 'Teacher',
    flag: 'isProfessional',
    mask: 4
}, {
    name: 'Coach',
    flag: 'isCoach',
    mask: 8
}];

const defaultIdentityFlags = exports.defaultIdentityFlags = {
    isStudent: false,
    isAlum: false,
    isProfessional: false,
    isCoach: false
};
//# sourceMappingURL=UserIdentityTypes.js.map