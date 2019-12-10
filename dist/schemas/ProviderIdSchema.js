"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require("joi");

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require("../utils/validation/AppSchema");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ProviderIdSchema extends _AppSchema.AppSchema {
  get params() {
    return Joi.object().keys({
      providerId: Joi.number().integer().positive().required()
    }).concat(super.params);
  }
}
exports.default = ProviderIdSchema;
//# sourceMappingURL=ProviderIdSchema.js.map