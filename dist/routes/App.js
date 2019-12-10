'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _swaggerUiExpress = require('swagger-ui-express');

var swagger = _interopRequireWildcard(_swaggerUiExpress);

var _RoutesInjector = require('../utils/routesInjector/RoutesInjector');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
    /**
     * @param {Object} container Awilix container for DI
     * @returns {e.Express}
     */
    constructor(container) {
        this.container = container;

        /**
         * @type {e.Express}
         */
        const application = (0, _express2.default)();
        application.use(_bodyParser2.default.json({ limit: '50mb' }));
        application.use((0, _cors2.default)());
        application.use(this.container.resolve('RequestLogger'));
        application.use(this.container.resolve('TimeoutCounter'));
        application.use(this.container.resolve('SetLocaleMiddleware'));

        const appBuilder = this.container.resolve('AppBuilder');
        appBuilder.API_URL = '/api';

        _RoutesInjector.RoutesInjector.registerRoutes(this.container, appBuilder);

        application.use(appBuilder.router);

        if (true !== _config2.default.get('production')) {
            application.use('/swagger', swagger.serve, swagger.setup(appBuilder.getDocs()));
        }

        application.use(this.container.resolve('ErrorHandler'));

        return application;
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map