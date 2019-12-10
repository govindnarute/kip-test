'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HttpStatusCode = require('./HttpStatusCode');

Object.keys(_HttpStatusCode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _HttpStatusCode[key];
    }
  });
});
//# sourceMappingURL=index.js.map