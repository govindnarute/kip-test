'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AutocompleteRoutesHandler = require('./AutocompleteRoutesHandler');

Object.keys(_AutocompleteRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map