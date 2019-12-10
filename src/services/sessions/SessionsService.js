import JWT from 'jsonwebtoken';
import uuid from 'uuid';

import { ObjectKeyComposer } from './../../helpers/ObjectKeyComposer';
import { SessionType } from '../../resources/sessions/SessionType';
import { UnprocessableError } from '../../utils/http';
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

export default class SessionsService {

    /**
     * @param {number} userId
     * @return {string}
     */
    static getUserAppendix(userId) {
        return ObjectKeyComposer.createKey('user', userId);
    }

    /**
     * @param {number} userId
     * @return {string}
     */
    static getSessionAppendix(userId) {
        return ObjectKeyComposer.createKey('user_session', userId);
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
        existAccessTokens.forEach( token => this.redisClient.del(token));
        const keys = existAccessTokens.concat(sessionKey);
        await this.redisClient.del(keys.toString());
    }

    /**
     * @param {number} userId
     * @param {object} sessionOptions
     * @return {Promise<SessionDto>}
     */
    async create(userId, sessionOptions = { type: SessionType.User, role: undefined }) {
        const uniqueKey = uuid.v4();

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

        const accessToken = JWT.sign({
            data: tokenParams
        }, this.config.get('jwt.key'), {
            expiresIn: lifeTime,
        });

        await this.addTokenToSessionList(userId, accessToken);
        await this.redisClient.set(accessToken, JSON.stringify(tokenParams), lifeTime);

        tokenParams.tokenType = 'refresh';
        tokenParams.accessToken = accessToken;
        const refreshToken = JWT.sign({
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
        const cachedSession = JSON.parse(await this.redisClient.get(accessToken));

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
            return JWT.verify(token, this.config.get('jwt.key'));
        } catch (e) {
            throw new UnprocessableError('LINK_EXPIRED');
        }
    }
}
