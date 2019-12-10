'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _imagesStatuses = require('./imagesStatuses');

Object.keys(_imagesStatuses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _imagesStatuses[key];
    }
  });
});

var _apiDescriptions = require('./apiDescriptions');

Object.keys(_apiDescriptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _apiDescriptions[key];
    }
  });
});
//# sourceMappingURL=index.js.map