'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CollectionDto = undefined;

var _PaginationDto = require('./PaginationDto');

class CollectionDto {
    static fromSchema(schema) {
        return {
            title: `${schema.title}Collection`,
            type: 'object',
            required: ['data'],
            properties: {
                data: schema,
                pagination: _PaginationDto.PaginationDto.schema
            }
        };
    }
}
exports.CollectionDto = CollectionDto;
//# sourceMappingURL=CollectionDto.js.map