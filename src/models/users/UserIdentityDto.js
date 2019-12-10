export class UserIdentityDto {
    static get schema() {
        return {
            title: 'IdentitySchema',
            type: 'object',
            required: [
            ],
            properties: {
                isStudent: {
                    type: 'boolean',
                },
                isAlum: {
                    type: 'boolean',
                },
                isProfessional: {
                    type: 'boolean',
                },
                isCoach: {
                    type: 'boolean',
                },
            }
        };
    }
}
