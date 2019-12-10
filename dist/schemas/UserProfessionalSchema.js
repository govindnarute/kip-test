'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

var _users = require('../resources/users');

var _HelpersSchema = require('./HelpersSchema');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class UserProfessionalSchema extends _AppSchema.AppSchema {

    get body() {
        const date = new Date();
        const currentYear = date.getFullYear();

        return Joi.object().keys({
            industries: Joi.array().items(_HelpersSchema.HelpersSchema.baseIdNameSchema(false, false, _users.rules.maxIdentityNameLength)).min(1).max(_users.rules.maxIdentityArrayLength).unique().required(),
            functions: Joi.array().items(_HelpersSchema.HelpersSchema.baseIdNameSchema(false, false, _users.rules.maxIdentityNameLength)).min(1).max(_users.rules.maxIdentityArrayLength).unique().required(),
            yearOfExperience: Joi.number().positive().precision(1).max(100).required(),
            companies: Joi.array().items({
                title: Joi.string().max(_users.rules.maxIdentityNameLength).trim().required(),
                company: _HelpersSchema.HelpersSchema.baseIdNameSchema(true, true, _users.rules.maxIdentityNameLength),
                location: Joi.object().keys({
                    id: Joi.number().integer().positive().required().options({
                        language: {
                            number: {
                                base: 'id in location must be a number'
                            }
                        }

                    }),
                    name: Joi.string().trim().required()
                }).optional(),
                fromDate: Joi.number().min(_users.rules.fromYear).max(currentYear).allow(null).required(),
                toDate: Joi.number().max(_users.rules.toYear).allow(null).required(),
                description: Joi.string().trim().max(_users.rules.maxDescriptionLength).optional(),
                isCurrent: Joi.boolean().required()
            }).min(1).max(_users.rules.maxIdentityArrayLength).unique().required()
        });
    }
}
exports.default = UserProfessionalSchema;
//# sourceMappingURL=UserProfessionalSchema.js.map