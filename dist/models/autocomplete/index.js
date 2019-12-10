'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AutocompleteDto = require('./AutocompleteDto');

Object.keys(_AutocompleteDto).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteDto[key];
    }
  });
});

var _AutocompleteListDto = require('./AutocompleteListDto');

Object.keys(_AutocompleteListDto).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteListDto[key];
    }
  });
});
//# sourceMappingURL=index.js.map