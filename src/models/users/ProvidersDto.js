import { ProviderDto } from './ProviderDto';

export class ProvidersDto {
    /**
     * @param {array} userProviders
     */
    constructor(userProviders) {
        /**
         * @type {object}
         */
        if (userProviders.providers.length) {
            this.data = userProviders.providers.map(
                provider => new ProviderDto(provider)
            );
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
                    items: ProviderDto.schema
                },

                totalCount: {
                    type: 'number'
                }
            }
        };
    }
}
