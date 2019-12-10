import * as Joi from 'joi';

export class HelpersSchema {
    /**
     * Base id|name object schema
     * @param {boolean} isRequired
     * @param {boolean} allowNull
     * @param {number} maxNameLength
     * @returns {Promise.<StudentSchoolDto>}
     */
    static baseIdNameSchema(isRequired, allowNull, maxNameLength) {
        const baseSchema = {
            id: Joi.number()
                .integer()
                .positive()
                .required(),
            name: Joi.string()
                .max(maxNameLength)
                .trim()
                .required(),
        };

        if (allowNull) {
            Object.assign(baseSchema.id, baseSchema.id.allow(null));
        }

        const schema = Joi.object().keys(baseSchema);

        if (isRequired) {
            Object.assign(schema, schema.required());
        } else {
            Object.assign(schema, schema.optional());
        }

        return schema;
    }
}
