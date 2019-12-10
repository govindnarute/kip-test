'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VerificationsRoutesHandler = require('./VerificationsRoutesHandler');

Object.keys(_VerificationsRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _VerificationsRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map