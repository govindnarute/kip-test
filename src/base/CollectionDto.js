import { PaginationDto } from './PaginationDto';

export class CollectionDto {
    static fromSchema(schema) {
        return {
            title: `${schema.title}Collection`,
            type: 'object',
            required: [
                'data',
            ],
            properties: {
                data: schema,
                pagination: PaginationDto.schema
            }
        };
    }
}
