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

class UserSchoolSchema extends _AppSchema.AppSchema {

    get body() {
        const date = new Date();
        const currentYear = date.getFullYear();

        return Joi.object().keys({
            school: _HelpersSchema.HelpersSchema.baseIdNameSchema(true, true, _users.rules.maxSchoolNameLength),
            degree: _HelpersSchema.HelpersSchema.baseIdNameSchema(false, true, _users.rules.maxIdentityNameLength),
            fieldOfStudy: _HelpersSchema.HelpersSchema.baseIdNameSchema(false, true, _users.rules.maxIdentityNameLength),
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
            fromYear: Joi.number().integer().positive().min(_users.rules.fromYear).max(currentYear).optional(),
            toYear: Joi.number().integer().positive().max(_users.rules.toYear).optional(),
            isCurrent: Joi.boolean().required()
        });
    }
}
exports.default = UserSchoolSchema;
//# sourceMappingURL=UserSchoolSchema.js.map