'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModelFactory = require('./UserModelFactory');

Object.keys(_UserModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _UserModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map