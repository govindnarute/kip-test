import { AppSchema } from '../utils/validation/AppSchema';

export default class FileSchema extends AppSchema {
    toSchema() {
        return {
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                file: {
                                    type: 'file',
                                }
                            }
                        }
                    }
                }
            },
            parameters: []
        };
    }
}
