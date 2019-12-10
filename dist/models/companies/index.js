'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CompaniesModelFactory = require('./CompaniesModelFactory');

Object.keys(_CompaniesModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CompaniesModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map