/**
 * wraps basic RedisClient methods with Promises
 * @class RedisWrapper
 */
export class RedisWrapper {
    constructor({ RedisClient }) {
        /**
         * @type {RedisClient}
         */
        this.redisClient = RedisClient;
    }

    /**
     * @param {string} key
     * @param {number} seconds
     * @return {Promise<void>}
     */
    expire(key, seconds) {
        return new Promise((resolve, reject) => {
            this.redisClient.expire(key, seconds, (error) => {
                return error ? reject(error) : resolve();
            });
        });
    }

    /**
     * @param {string} key
     * @return {Promise<string>}
     */
    get(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, (error, value) => {
                return error ? reject(error) : resolve(value);
            });
        });
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} expiresIn
     * @return {Promise<void>}
     */
    set(key, value, expiresIn) {
        return new Promise((resolve, reject) => {
            this.redisClient.setex(key, expiresIn, value, (error) => {
                return error ? reject(error) : resolve();
            });
        });
    }

    /**
     * @param {string[]} keys
     * @return {Promise<void>}
     */
    del(...keys) {
        return new Promise((resolve, reject) => {
            this.redisClient.del(keys, (error) => {
                return error ? reject(error) : resolve();
            });
        });
    }

    /**
     * returns number of added values
     *
     * @param {string} key
     * @param {string} values
     * @returns {Promise<number>}
     */
    sadd(key, ...values) {
        return new Promise((resolve, reject) => {
            this.redisClient.sadd(key, values, (error, added) => {
                return error ? reject(error) : resolve(added);
            });
        });
    }

    /**
     * @param {string} key
     * @return {Promise<string[]>}
     */
    smembers(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.smembers(key, (error, values) => {
                return error ? reject(error) : resolve(values);
            });
        });
    }

    /**
     * @param {string} key
     * @param {string[]} values
     * @return {Promise<string[]>}
     */
    lpush(key, values) {
        return new Promise((resolve, reject) => {
            this.redisClient.lpush(key, ...values, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    }

    /**
     * @param {string} key
     * @param {number} startIndex
     * @param {number} endIndex
     * @return {Promise<string[]>}
     */
    lrange(key, startIndex, endIndex) {
        return new Promise((resolve, reject) => {
            this.redisClient.lrange(key, startIndex, endIndex, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    }

    /**
     * @param {string} key
     * @param {number} index
     * @param {string} value
     * @return {Promise<string[]>}
     */
    lrem(key, index, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.lrem(key, index, value, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    }
}
