'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ImagesRoutesHandler = require('./ImagesRoutesHandler');

Object.keys(_ImagesRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ImagesRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map