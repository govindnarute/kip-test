'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DegreesModelFactory = require('./DegreesModelFactory');

Object.keys(_DegreesModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DegreesModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map