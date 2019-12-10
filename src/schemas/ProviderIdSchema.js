import * as Joi from "joi";
import { AppSchema } from "../utils/validation/AppSchema";

export default class ProviderIdSchema extends AppSchema {
  get params() {
    return Joi.object()
      .keys({
        providerId: Joi.number()
          .integer()
          .positive()
          .required()
      })
      .concat(super.params);
  }
}
