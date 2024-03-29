import * as awilix from 'awilix';
import { DBConnectionFactory } from './utils/database/DBConnectionFactory';
import { LoggerFactory } from './utils/logger';
import config from 'config';
import { RedisConnectionFactory } from './utils/redis/RedisConnectionFactory';
import { RequestLoggerFactory, ErrorHandlerFactory, TimeoutCounterFactory, LocaleFactory } from './utils/middlewares';
import { AuthHandler } from './utils/authHandlers/AuthHandler';
import { BuilderAuthHandler } from './utils/authHandlers/BuilderAuthHandler';
import { RedisWrapper } from './utils/redis/RedisWrapper';
import { AppBuilder } from './routes/AppBuilder';

export class DIContainerFactory {
    static createContainer() {
        const container =  awilix.createContainer({
            injectionMode: awilix.InjectionMode.PROXY
        });

        const OriginalRegister = container.register;
        const logger = LoggerFactory.createLogger('DI'), routesHandlerArray = [];
        /**
         * @param {string|Object} dependency
         */
        container.register = function(dependency) {
            /**
             * @type {string[]}
             */
            let dependencies;
            if (typeof dependency === 'string') {
                dependencies = [ dependency ];
            }
            if (typeof dependency === 'object') {
                dependencies = Object.keys(dependency);
            }
            dependencies.forEach(dependencyName => logger.log('di', `Dependency has been registered: \u001b[39m\u001b[36m${dependencyName}\u001b[39m\u001b[49m`));
            OriginalRegister(...arguments);
        };
        // Collect custom dependencies
        container
            .register({
                config: awilix.asValue(config),
                LoggerFactory: awilix.asValue(LoggerFactory),
                WebLogger: awilix.asValue(LoggerFactory.createLogger('Web')),
                DBConnection: awilix.asFunction(DBConnectionFactory.connect),
                RedisClient: awilix.asFunction(RedisConnectionFactory.connect),
                RedisWrapper: awilix.asClass(RedisWrapper).singleton(),
                RequestLogger: awilix.asFunction(RequestLoggerFactory.getWriter),
                TimeoutCounter: awilix.asFunction(TimeoutCounterFactory.startCounter),
                ErrorHandler: awilix.asFunction(ErrorHandlerFactory.errorHandler),
                AuthHandler: awilix.asClass(AuthHandler),
                BuilderAuthHandler: awilix.asClass(BuilderAuthHandler),
                AppBuilder: awilix.asClass(AppBuilder),
                SetLocaleMiddleware: awilix.asFunction(LocaleFactory.setLocale),
            });

        // Class loader. Collect pattern-like dependencies
        container
            .loadModules([
                'controllers/**/*Controller.js',
                'services/**/*Service.js',
                'schemas/**/*Schema.js',
                'routes/**/*RoutesHandler.js',
            ], {
                cwd: __dirname,
                formatName(filename) {
                    return filename;
                },
                resolverOptions: {
                    register: awilix.asClass,
                    lifetime: awilix.Lifetime.SINGLETON,
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
