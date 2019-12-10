'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersRoutesHandler = require('./UsersRoutesHandler');

Object.keys(_UsersRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _UsersRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map