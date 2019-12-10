import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

const LIMIT_MIN = 0;
const LIMIT_MAX = 100;
const MIN_OFFSET = 0;

export default class CommonFieldsSchema extends AppSchema {

    pagination() {
        return {
            limit: Joi.number()
                .integer()
                .min(LIMIT_MIN)
                .max(LIMIT_MAX)
                .default(LIMIT_MAX)
                .description('Amount of entities to return')
                .optional(),
            offset: Joi.number()
                .integer()
                .min(MIN_OFFSET)
                .default(MIN_OFFSET)
                .description('Pagination offset')
                .optional(),
            withoutPagination: Joi.boolean()
                .default(false)
                .description('Boolean, default false')
                .allow('')
                .optional(),
        };
    }

    order(fields) {
        return {
            orderBy: Joi
                .string()
                .valid(fields)
                .description(`Order fields: ${fields.join(', ')}`)
                .optional(),
            orderType: Joi
                .string()
                .valid('asc', 'desc')
                .description('Order types: asc, desc')
                .optional()
        };
    }

    search() {
        return {
            q: Joi
                .string()
                .description('Word for search')
                .allow('')
                .optional()
        };
    }

    providersFilter() {
        return {
            identities: Joi.number()
                .description('Number identity: 1 - professional 2 - Coach 3 - both ')
                .allow('')
                .optional(),
            locationsId:
                Joi
                    .array()
                    .items(Joi.number())
                    .description('Array of numbers (locationID) search')
                    .allow('')
                    .optional()
            ,
            industriesId:
                Joi
                    .array()
                    .items(Joi.number())
                    .description('Array of numbers (industryId) search')
                    .allow('')
                    .optional()
            ,
            functionsId:
                Joi
                    .array()
                    .items(Joi.number())
                    .description('Array of numbers (functionsId) search')
                    .allow('')
                    .optional()
            ,
            minExp: Joi.number()
                .description('Number, minimum years of experience')
                .allow('')
                .optional(),
            compensation: Joi.boolean()
                .description('Boolean, requires compensation')
                .allow('')
                .optional(),
            inWatchList: Joi.boolean()
                .description('Boolean, in my watchList')
                .allow('')
                .optional(),
            fromMySchool: Joi.boolean()
                .description('Boolean, from my watchList')
                .allow('')
                .optional(),
            inMyGroups: Joi.boolean()
                .description('Boolean, in my groups')
                .allow('')
                .optional(),
            keyword: Joi.string()
                .description('Word for search')
                .allow('')
                .optional()
        };
    }
}
