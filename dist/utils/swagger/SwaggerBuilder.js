'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwaggerBuilder = undefined;

var _package = require('./../../../package');

var pjson = _interopRequireWildcard(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class SwaggerBuilder {
  constructor(baseUrl, version = 'v1') {
    this.docs = {
      openapi: '3.0.0',
      info: {
        title: `${pjson.name} API Docs`,
        version: pjson.version
      },
      servers: [{
        url: `${baseUrl}/${version}`
      }],
      paths: {},
      parameters: {},
      components: {
        schemas: {},
        securitySchemes: {}
      }
    };

    this.defaultResponseStatus = 200;
    this.emptyStatusCode = 204;
  }

  /**
   * @param {string} path
   * @param {AppRoute} route
   */
  addRoute(path, route) {
    const routePath = route.path === '/' ? '' : route.path;
    let apiPath = `${path}${routePath}`;
    apiPath = this.compileApiPath(apiPath);
    const responseStatus = route.responseStatus || this.defaultResponseStatus;
    this.docs.paths[apiPath] = this.docs.paths[apiPath] ? this.docs.paths[apiPath] : {};
    this.docs.paths[apiPath][route.method] = {
      tags: route.tags || [],
      summary: route.summary || '',
      description: route.description || '',
      security: route.auth ? this.getSecuritySchema(route.auth) : [],
      requestBody: route.consumes.toSchema().requestBody,
      parameters: route.consumes.toSchema().parameters,
      responses: {
        [responseStatus]: this.configureResponse(route.consumes, route.produces, responseStatus)
      }
    };
    this.log(`Route documentation added: ${route.method.toUpperCase()} ${apiPath}`);
  }

  /**
   * @param schema
   * @param produces
   * @param statusCode
   */
  configureResponse(schema, produces, statusCode = this.defaultResponseStatus) {
    if (statusCode === this.emptyStatusCode) {
      return {};
    }
    const schemaName = `${schema.__proto__.constructor.name}Response`;
    this.docs.components.schemas[schemaName] = produces;
    return {
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${schemaName}`
          }
        }
      }
    };
  }

  getSecuritySchema(auth) {
    if (typeof auth === 'object') {
      const schema = auth.toSchema();
      const schemaName = Object.keys(schema)[0];
      this.docs.components.securitySchemes = Object.assign(this.docs.components.securitySchemes, schema);
      return [{
        [schemaName]: []
      }];
    }

    if (Array.isArray(auth)) {
      return auth.map(instance => {
        const schema = instance.toSchema();
        const schemaName = Object.keys(schema)[0];
        this.docs.components.securitySchemes = Object.assign(this.docs.components.securitySchemes, schema);
        return {
          [schemaName]: []
        };
      });
    }
  }

  /**
   * @param {winston.Logger} logger
   */
  setLogger(logger) {
    /**
     * @type {winston.Logger}
     */
    this.logger = logger;
  }

  /**
   * @private
   */
  log() {
    if (this.logger) {
      this.logger.log('swagger', ...arguments);
    }
  }

  /**
   * @private
   * @param {string} path
   */
  compileApiPath(path) {
    const reg = new RegExp(/:\w+/, 'gm');
    return path.replace(reg, found => found.replace(':', '{') + '}');
  }
}
exports.SwaggerBuilder = SwaggerBuilder;
//# sourceMappingURL=SwaggerBuilder.js.map