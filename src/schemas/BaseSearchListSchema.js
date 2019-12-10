import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class BaseSearchListSchema extends AppSchema {
    constructor({ CommonFieldsSchema }) {
        super();
        this.commonFieldsSchema = CommonFieldsSchema;
    }

    get query() {
        return Joi.object().keys(
            Object.assign(
                this.commonFieldsSchema.search(),
                this.commonFieldsSchema.pagination(),
                this.commonFieldsSchema.providersFilter()
            )
        );
    }
}
