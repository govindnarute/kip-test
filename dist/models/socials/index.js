'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SocialsModelFactory = require('./SocialsModelFactory');

Object.keys(_SocialsModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SocialsModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map