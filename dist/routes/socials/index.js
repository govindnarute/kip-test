'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SocialsRoutesHandler = require('./SocialsRoutesHandler');

Object.keys(_SocialsRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SocialsRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map