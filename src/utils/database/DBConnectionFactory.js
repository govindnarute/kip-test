import { LoggerFactory } from './../logger';
import { tz } from 'moment-timezone';
import Sequelize from 'sequelize';
import { DatabaseInjector } from '../../models/DatabaseInjector';

export class DBConnectionFactory {
    /**
     * @return {sequelize.Sequelize}
     */
    static connect({ config }) {
        /**
         * @type {string}
         */
        const environment = process.env.NODE_ENV;
        const dbConfig = Object.assign({}, config.get(environment));
        const logger = LoggerFactory.createLogger(dbConfig.label);
        dbConfig.logging = logger.sql;
        dbConfig.timezone = tz.guess();
        const sequelize = new Sequelize(dbConfig);
        DatabaseInjector.injectModels(sequelize);

        return sequelize;
    }
}
