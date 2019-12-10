'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProvidersDto = undefined;

var _ProviderDto = require('./ProviderDto');

class ProvidersDto {
    /**
     * @param {array} userProviders
     */
    constructor(userProviders) {
        /**
         * @type {object}
         */
        if (userProviders.providers.length) {
            this.data = userProviders.providers.map(provider => new _ProviderDto.ProviderDto(provider));
        } else {
            this.data = [];
        }

        this.totalCount = userProviders.totalCount;
    }

    static get schema() {
        return {
            title: 'ProvidersDto',
            type: 'object',
            required: [],
            properties: {
                data: {
                    type: 'array',
                    items: _ProviderDto.ProviderDto.schema
                },

                totalCount: {
                    type: 'number'
                }
            }
        };
    }
}
exports.ProvidersDto = ProvidersDto;
//# sourceMappingURL=ProvidersDto.js.map