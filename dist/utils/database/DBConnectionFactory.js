'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBConnectionFactory = undefined;

var _logger = require('./../logger');

var _momentTimezone = require('moment-timezone');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _DatabaseInjector = require('../../models/DatabaseInjector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DBConnectionFactory {
  /**
   * @return {sequelize.Sequelize}
   */
  static connect({ config }) {
    /**
     * @type {string}
     */
    const environment = process.env.NODE_ENV;
    const dbConfig = Object.assign({}, config.get(environment));
    const logger = _logger.LoggerFactory.createLogger(dbConfig.label);
    dbConfig.logging = logger.sql;
    dbConfig.timezone = _momentTimezone.tz.guess();
    const sequelize = new _sequelize2.default(dbConfig);
    _DatabaseInjector.DatabaseInjector.injectModels(sequelize);

    return sequelize;
  }
}
exports.DBConnectionFactory = DBConnectionFactory;
//# sourceMappingURL=DBConnectionFactory.js.map