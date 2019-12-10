/**
 * @typedef {Object} AppRoute
 * @param {string} path
 * @param {string} method
 * @param {string=} summary
 * @param {string=} description
 * @param {number=} responseStatus
 * @param {boolean|BaseAuth|BaseAuth[]} auth
 * @param {AppSchema} consumes
 * @param {Object} produces
 * @param {function(*)[]} beforeHooks
 * @param {function} handler
 */

/**
 * Basic route handler
 */
export class BasicHandler {
    constructor() {
        /**
         * @type {AppRoute[]}
         */
        this.routesCache = [];
    }
    get routes() { return this.routesCache; }
    setup() { return null; }
    /**
     * @param {AppRoute} route
     */
    addRoute(route) {
        this.routesCache.push(route);
    }
}
