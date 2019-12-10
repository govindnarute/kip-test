'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IndustriesModelFactory = require('./IndustriesModelFactory');

Object.keys(_IndustriesModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IndustriesModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map