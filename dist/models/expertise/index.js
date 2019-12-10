'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ExpertiseModelFactory = require('./ExpertiseModelFactory');

Object.keys(_ExpertiseModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ExpertiseModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map