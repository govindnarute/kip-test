"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @typedef {Object} AppBuilder
 */

class RoutesInjector {
    /**
     * @param {Object} container Awilix container for DI
     * @param {AppBuilder} appBuilder
     */
    static registerRoutes(container, appBuilder) {
        if (!container.cradle.routesScope.length) return;

        container.cradle.routesScope.forEach(item => {
            const resolver = container.resolve(item);
            appBuilder.registerRoutes(resolver.apiRoot, resolver);
        });
    }
}
exports.RoutesInjector = RoutesInjector;
//# sourceMappingURL=RoutesInjector.js.map