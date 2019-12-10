/**
 * @type {{student: number, alum: number, teacher: number, coach: number}}
 */

export const identityMask = [
    {
        name: 'Student',
        flag: 'isStudent',
        mask: 1
    },
    {
        name: 'Alum',
        flag: 'isAlum',
        mask: 2
    },
    {
        name: 'Teacher',
        flag: 'isProfessional',
        mask: 4
    },
    {
        name: 'Coach',
        flag: 'isCoach',
        mask: 8
    }
];

export const defaultIdentityFlags = {
    isStudent: false,
    isAlum: false,
    isProfessional: false,
    isCoach: false,
};
