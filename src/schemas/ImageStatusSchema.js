import * as Joi from 'joi';
import { AppSchema } from '../utils/validation/AppSchema';
import { ImageStatus } from '../resources/images/imagesStatuses';

export default class ImageStatusSchema extends AppSchema {
    get body() {
        return Joi.object()
            .keys({
                status: Joi
                    .number()
                    .integer()
                    .valid([ImageStatus.Pending, ImageStatus.Loaded])
                    .required(),
            });
    }

    get params() {
        return Joi.object()
            .keys({
                imageId: Joi
                    .number()
                    .integer()
                    .positive()
                    .required()
            })
            .concat(super.params);
    }
}
