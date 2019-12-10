'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FieldOfStudyModelFactory = require('./FieldOfStudyModelFactory');

Object.keys(_FieldOfStudyModelFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FieldOfStudyModelFactory[key];
    }
  });
});
//# sourceMappingURL=index.js.map