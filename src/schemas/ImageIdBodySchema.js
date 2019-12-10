import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';

export default class ImageIdBodySchema extends AppSchema {
    get body() {

        return Joi.object()
            .keys({
                imageId: Joi
                    .number()
                    .integer()
                    .required()
            });
    }
}
