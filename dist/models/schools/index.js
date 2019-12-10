'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SchoolsModelFactory = require('./SchoolsModelFactory');

Object.keys(_SchoolsModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SchoolsModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map