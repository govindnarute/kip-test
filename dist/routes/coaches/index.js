'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CoachesRoutesHandler = require('./CoachesRoutesHandler');

Object.keys(_CoachesRoutesHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CoachesRoutesHandler[key];
    }
  });
});
//# sourceMappingURL=index.js.map