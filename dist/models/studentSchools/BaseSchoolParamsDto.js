'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @extends BaseDto
 */
class BaseSchoolParamsDto {
    static baseModel(data) {
        if (!data) {
            return null;
        }

        return {
            id: data.get('id'),
            name: data.get('name')
        };
    }

    static get schema() {
        return {
            title: 'BaseSchema',
            type: 'object',
            nullable: true,
            required: [],
            properties: {
                id: {
                    type: 'number'
                },
                name: {
                    type: 'string'
                }
            }
        };
    }
}
exports.BaseSchoolParamsDto = BaseSchoolParamsDto;
//# sourceMappingURL=BaseSchoolParamsDto.js.map