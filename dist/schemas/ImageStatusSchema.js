'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _AppSchema = require('../utils/validation/AppSchema');

var _imagesStatuses = require('../resources/images/imagesStatuses');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ImageStatusSchema extends _AppSchema.AppSchema {
    get body() {
        return Joi.object().keys({
            status: Joi.number().integer().valid([_imagesStatuses.ImageStatus.Pending, _imagesStatuses.ImageStatus.Loaded]).required()
        });
    }

    get params() {
        return Joi.object().keys({
            imageId: Joi.number().integer().positive().required()
        }).concat(super.params);
    }
}
exports.default = ImageStatusSchema;
//# sourceMappingURL=ImageStatusSchema.js.map