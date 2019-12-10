'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppBuilder = undefined;

var _ValidationPipe = require('../utils/validation/ValidationPipe');

var _AppSchema = require('../utils/validation/AppSchema');

var _swagger = require('../utils/swagger');

var _erros = require('../resources/erros');

var _ResponseMapper = require('../utils/http/ResponseMapper');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_URL = '/api';

class AppBuilder {
    constructor({ AuthHandler, BuilderAuthHandler, LoggerFactory }) {
        this.AuthHandler = AuthHandler;
        this.BuilderAuthHandler = BuilderAuthHandler;
        this.router = _express2.default.Router();
        this.apiUrl = `${API_URL}/:version`;

        this.swaggerLogger = LoggerFactory.createLogger('SWAGGER');
        this.swaggerHelper = new _swagger.SwaggerBuilder(API_URL);
        this.swaggerHelper.setLogger(this.swaggerLogger);
    }

    /**
     * @param {string} url
     */
    set API_URL(url) {
        this.apiUrl = `${url}/:version`;
        this.swaggerHelper = new _swagger.SwaggerBuilder(url);
        this.swaggerHelper.setLogger(this.swaggerLogger);
    }

    /**
     * register routes
     * @param {string} path
     * @param {BasicHandler} routesHandler
     */
    registerRoutes(path, routesHandler) {
        routesHandler.setup();
        routesHandler.routes.forEach(route => {
            let chain = [];
            // add auth middlewares before all beforeHooks
            if (route.auth instanceof Array) {
                chain = route.auth.map(auth => auth.authenticator());
            }
            // add single auth middleware
            if (typeof route.auth === 'object' && !Array.isArray(route.auth)) {
                chain.push(route.auth.authenticator());
            }
            // use default authenticator
            if (route.auth === true) {
                chain.push(this.BuilderAuthHandler.build().authenticator());
            }

            if (route.auth) {
                route.auth = this.AuthHandler;
            }

            // insert ValidationPipe into chain
            let schema = new _AppSchema.AppSchema();
            if (route.consumes) {
                schema = route.consumes;
            }
            chain.push(async (req, res, next) => {
                try {
                    await _ValidationPipe.ValidationPipe.validateAppSchema(schema, req);
                    next();
                } catch (e) {
                    next(e);
                }
            });
            // insert beforeHooks into chain
            chain = chain.concat(route.beforeHooks);
            this.router[route.method](`${this.apiUrl}${path}${route.path}`, chain, async (request, response, next) => {
                try {
                    const output = await route.handler(request);
                    const jsonString = _ResponseMapper.ResponseMapper.compile(route.produces, output);

                    response.header('content-type', 'application/json').status(route.responseStatus || _erros.HttpStatusCode.OK).send(jsonString);
                } catch (e) {
                    return next(e);
                }
            });

            this.swaggerHelper.addRoute(path, route);
        });
    }

    /**
     * @returns {Object}
     */
    getDocs() {
        return this.swaggerHelper.docs;
    }
}
exports.AppBuilder = AppBuilder;
//# sourceMappingURL=AppBuilder.js.map