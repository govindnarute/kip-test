'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class AutocompleteService {
    async setScopesAndGetList(Model, query, withoutPagination = query.withoutPagination) {
        let list = [];
        const scopes = ['onlyForShow'];

        if (query.q) {
            scopes.push({ method: ['search', query.q] });
        }

        const count = await this.getCount(Model, scopes);

        if (count) {
            if (withoutPagination) {
                list = await this.getListWithoutPagination(Model, scopes);
            } else {
                list = await this.getList(Model, scopes, query);
            }
        }

        return { list, count };
    }

    /**
     * Get count
     * @param Model
     * @param scopes
     * @returns {Promise.<void>}
     */
    async getCount(Model, scopes) {
        return Model.scope(scopes).count();
    }

    /**
     * Get list
     * @param Model
     * @param scopes
     * @param query
     * @returns {Promise.<Promise.<Array.<Model>>|Bluebird<TInstance[]>>}
     */
    async getList(Model, scopes, query) {
        return Model.scope(scopes.concat({ method: ['pagination', query] })).findAll();
    }

    async getListWithoutPagination(Model, scopes) {
        return Model.scope(scopes).findAll();
    }
}
exports.default = AutocompleteService;
//# sourceMappingURL=AutocompleteService.js.map