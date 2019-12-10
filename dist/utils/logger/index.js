'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoggerFactory = require('./LoggerFactory');

Object.keys(_LoggerFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LoggerFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map