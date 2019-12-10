'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DIContainerFactory = undefined;

var _awilix = require('awilix');

var awilix = _interopRequireWildcard(_awilix);

var _DBConnectionFactory = require('./utils/database/DBConnectionFactory');

var _logger = require('./utils/logger');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _RedisConnectionFactory = require('./utils/redis/RedisConnectionFactory');

var _middlewares = require('./utils/middlewares');

var _AuthHandler = require('./utils/authHandlers/AuthHandler');

var _BuilderAuthHandler = require('./utils/authHandlers/BuilderAuthHandler');

var _RedisWrapper = require('./utils/redis/RedisWrapper');

var _AppBuilder = require('./routes/AppBuilder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class DIContainerFactory {
    static createContainer() {
        const container = awilix.createContainer({
            injectionMode: awilix.InjectionMode.PROXY
        });

        const OriginalRegister = container.register;
        const logger = _logger.LoggerFactory.createLogger('DI'),
              routesHandlerArray = [];
        /**
         * @param {string|Object} dependency
         */
        container.register = function (dependency) {
            /**
             * @type {string[]}
             */
            let dependencies;
            if (typeof dependency === 'string') {
                dependencies = [dependency];
            }
            if (typeof dependency === 'object') {
                dependencies = Object.keys(dependency);
            }
            dependencies.forEach(dependencyName => logger.log('di', `Dependency has been registered: \u001b[39m\u001b[36m${dependencyName}\u001b[39m\u001b[49m`));
            OriginalRegister(...arguments);
        };
        // Collect custom dependencies
        container.register({
            config: awilix.asValue(_config2.default),
            LoggerFactory: awilix.asValue(_logger.LoggerFactory),
            WebLogger: awilix.asValue(_logger.LoggerFactory.createLogger('Web')),
            DBConnection: awilix.asFunction(_DBConnectionFactory.DBConnectionFactory.connect),
            RedisClient: awilix.asFunction(_RedisConnectionFactory.RedisConnectionFactory.connect),
            RedisWrapper: awilix.asClass(_RedisWrapper.RedisWrapper).singleton(),
            RequestLogger: awilix.asFunction(_middlewares.RequestLoggerFactory.getWriter),
            TimeoutCounter: awilix.asFunction(_middlewares.TimeoutCounterFactory.startCounter),
            ErrorHandler: awilix.asFunction(_middlewares.ErrorHandlerFactory.errorHandler),
            AuthHandler: awilix.asClass(_AuthHandler.AuthHandler),
            BuilderAuthHandler: awilix.asClass(_BuilderAuthHandler.BuilderAuthHandler),
            AppBuilder: awilix.asClass(_AppBuilder.AppBuilder),
            SetLocaleMiddleware: awilix.asFunction(_middlewares.LocaleFactory.setLocale)
        });

        // Class loader. Collect pattern-like dependencies
        container.loadModules(['controllers/**/*Controller.js', 'services/**/*Service.js', 'schemas/**/*Schema.js', 'routes/**/*RoutesHandler.js'], {
            cwd: __dirname,
            formatName(filename) {
                return filename;
            },
            resolverOptions: {
                register: awilix.asClass,
                lifetime: awilix.Lifetime.SINGLETON
            }
        });

        // Save array of RoutesHandler
        container.loadModules(['routes/**/*RoutesHandler.js'], {
            cwd: __dirname,
            formatName(filename) {
                routesHandlerArray.push(filename);
                return filename;
            }
        });

        container.register({ routesScope: awilix.asValue(routesHandlerArray) });

        return container;
    }
}
exports.DIContainerFactory = DIContainerFactory;
//# sourceMappingURL=DIContainerFactory.js.map