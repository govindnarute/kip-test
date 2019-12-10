'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class UserIdentityDto {
    static get schema() {
        return {
            title: 'IdentitySchema',
            type: 'object',
            required: [],
            properties: {
                isStudent: {
                    type: 'boolean'
                },
                isAlum: {
                    type: 'boolean'
                },
                isProfessional: {
                    type: 'boolean'
                },
                isCoach: {
                    type: 'boolean'
                }
            }
        };
    }
}
exports.UserIdentityDto = UserIdentityDto;
//# sourceMappingURL=UserIdentityDto.js.map