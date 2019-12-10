export class AutocompleteDto {
    static model(data) {
        if (!data) {
            return null;
        }

        return {
            id: data.get('id'),
            name: data.get('name')
        };
    }

    static arrayModel(data) {
        if(data.length) {
            return data.map(item => this.model(item));
        } else {
            return [];
        }
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
