
export class SessionDto {
    /**
     * @param session
     */
    constructor(session) {

        /**
         * @type {string}
         */
        this.accessToken = session.accessToken;

        /**
         * @type {number}
         */
        this.expiresAt = session.lifeTime;

        /**
         * @type {string}
         */
        this.refreshToken = session.refreshToken;
    }

    static get schema() {
        return {
            title: 'SessionSchema',
            type: 'object',
            required: [
                'accessToken',
                'expiresAt',
                'refreshToken'
            ],
            properties: {
                accessToken: {
                    type: 'string',
                },
                refreshToken: {
                    type: 'string',
                },
                expiresAt: {
                    type: 'number',
                },
            }
        };
    }
}
