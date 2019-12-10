'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppSchema = require('../utils/validation/AppSchema');

class FileSchema extends _AppSchema.AppSchema {
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
                                    type: 'file'
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
exports.default = FileSchema;
//# sourceMappingURL=FileSchema.js.map