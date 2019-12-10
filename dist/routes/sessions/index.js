'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SessionsRoutesHandler = require('./SessionsRoutesHandler');

Object.keys(_SessionsRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SessionsRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map