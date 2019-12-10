'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SchoolsRoutesHandler = require('./SchoolsRoutesHandler');

Object.keys(_SchoolsRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SchoolsRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map