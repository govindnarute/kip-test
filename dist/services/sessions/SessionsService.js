'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _ObjectKeyComposer = require('./../../helpers/ObjectKeyComposer');

var _SessionType = require('../../resources/sessions/SessionType');

var _http = require('../../utils/http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} SessionOptions
 * @property {number} lifeTime (seconds)
 * @property {SessionType} type
 */

/**
 * @typedef {Object} CachedSession
 * @property {string} sessionId
 * @property {string} type
 * @property {number} userId
 */

/**
 * @typedef {Object} FullSession
 * @property {number} sessionId
 * @property {number} userId
 * @property {number} lifeTime (seconds)
 * @property {string} accessToken,
 * @property {string} refreshToken
 */

class SessionsService {

    /**
     * @param {number} userId
     * @return {string}
     */
    static getUserAppendix(userId) {
        return _ObjectKeyComposer.ObjectKeyComposer.createKey('user', userId);
    }

    /**
     * @param {number} userId
     * @return {string}
     */
    static getSessionAppendix(userId) {
        return _ObjectKeyComposer.ObjectKeyComposer.createKey('user_session', userId);
    }

    /**
     * @param {Object} container
     */
    constructor({ RedisWrapper, config, UsersService }) {
        /**
         * @type {RedisWrapper}
         * @private
         */
        this.redisClient = RedisWrapper;

        /**
         * @type {Object}
         * @private
         */
        this.config = config;

        this.usersService = UsersService;
    }

    /**
     * @param {number} userId
     * @return {Promise<void>}
     */
    async destroyAllSessions(userId) {
        const sessionKey = SessionsService.getSessionAppendix(userId);
        const existAccessTokens = await this.redisClient.lrange(sessionKey, 0, -1);
        existAccessTokens.forEach(token => this.redisClient.del(token));
        const keys = existAccessTokens.concat(sessionKey);
        await this.redisClient.del(keys.toString());
    }

    /**
     * @param {number} userId
     * @param {object} sessionOptions
     * @return {Promise<SessionDto>}
     */
    async create(userId, sessionOptions = { type: _SessionType.SessionType.User, role: undefined }) {
        const uniqueKey = _uuid2.default.v4();

        /**
         * @type {CachedSession}
         */
        const tokenParams = {
            userId,
            type: sessionOptions.type,
            role: sessionOptions.role,
            sessionId: uniqueKey
        };

        const lifeTime = sessionOptions.lifeTime || this.config.get('jwt.lifeTime');

        const accessToken = _jsonwebtoken2.default.sign({
            data: tokenParams
        }, this.config.get('jwt.key'), {
            expiresIn: lifeTime
        });

        await this.addTokenToSessionList(userId, accessToken);
        await this.redisClient.set(accessToken, JSON.stringify(tokenParams), lifeTime);

        tokenParams.tokenType = 'refresh';
        tokenParams.accessToken = accessToken;
        const refreshToken = _jsonwebtoken2.default.sign({
            data: tokenParams
        }, this.config.get('jwt.key'));

        return { accessToken, refreshToken, lifeTime };
    }

    /**
     * @param {number} userId
     * @param {string} accessToken
     * @returns {Promise<string[]>}
     */
    async addTokenToSessionList(userId, accessToken) {
        return await this.redisClient.lpush(SessionsService.getSessionAppendix(userId), [accessToken]);
    }

    /**
     * @param {number} userId
     * @param {string} accessToken
     * @returns {Promise<string[]>}
     */
    async deleteTokenFromSessionList(userId, accessToken) {
        return this.redisClient.lrem(SessionsService.getSessionAppendix(userId), 0, accessToken);
    }

    /**
     * @param {string} accessToken
     * @return {Promise<CachedSession>}
     */
    async findSession(accessToken) {
        /**
         * @type {CachedSession}
         */
        const cachedSession = JSON.parse((await this.redisClient.get(accessToken)));

        if (!cachedSession) {
            return null;
        }

        return cachedSession;
    }

    /**
     * @param {number} adminId
     * @param {string} accessToken
     * @return {Promise<void>}
     */
    async destroy(adminId, accessToken) {
        await this.deleteTokenFromSessionList(adminId, accessToken);
        await this.redisClient.del(accessToken);
    }

    /**
     * @param {string} refreshToken
     * @return {Promise<CachedSession>}
     */
    async refresh(refreshToken) {
        const sessionParams = this.verifyToken(refreshToken);
        await this.usersService.checkUserForRefresh(sessionParams.data.userId);
        await this.destroy(sessionParams.data.userId, sessionParams.data.accessToken);
        return this.create(sessionParams.data.userId, { type: sessionParams.data.type, role: sessionParams.data.role });
    }

    /**
     * verify token
     * @param token
     * @returns {Object | Error}
     */
    verifyToken(token) {
        try {
            return _jsonwebtoken2.default.verify(token, this.config.get('jwt.key'));
        } catch (e) {
            throw new _http.UnprocessableError('LINK_EXPIRED');
        }
    }
}
exports.default = SessionsService;
//# sourceMappingURL=SessionsService.js.map