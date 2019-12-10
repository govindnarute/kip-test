/**
 * @extends BaseDto
 */
export class BaseSchoolParamsDto {
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
            required: [
            ],
            properties: {
                id: {
                    type: 'number',
                },
                name: {
                    type: 'string',
                }
            }
        };
    }
}
