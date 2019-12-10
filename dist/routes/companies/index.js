'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CompaniesRoutesHandler = require('./CompaniesRoutesHandler');

Object.keys(_CompaniesRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CompaniesRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map