'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SocialTypes = require('./SocialTypes');

Object.keys(_SocialTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SocialTypes[key];
    }
  });
});
//# sourceMappingURL=index.js.map