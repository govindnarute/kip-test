/**
 * @type {{seeker: number, provider: number, both: number}}
 */
export const userTypes = {
    seeker: 1,
    provider: 2,
    both: 3
};

/**
 * @type {{everyone: number, students: number, professionals: number, fromMySchool: number}}
 */
export const userAvailabilityTypes = [
    {
        id: 1,
        name: 'Everyone'
    },
    {
        id: 2,
        name: 'Only Students'
    },
    {
        id: 3,
        name: 'Only Professionals'
    },
    {
        id: 4,
        name: 'Only People From My School(s)'
    },
];
