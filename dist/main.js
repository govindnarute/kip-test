'use strict';

require('source-map-support/register');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _App = require('./routes/App');

var _DIContainerFactory = require('./DIContainerFactory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// normalize NODE_ENV variable
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; // eslint-disable-next-line node/no-extraneous-import


const port = _config2.default.get('server.port');
const container = _DIContainerFactory.DIContainerFactory.createContainer();
const application = new _App.App(container);
const server = _http2.default.createServer(application);

server.listen(port, () => {
    const address = server.address();
    const loggerInstance = container.resolve('LoggerFactory').createLogger();

    process.addListener('unhandledRejection', exception => {
        loggerInstance.error('Unhandled Rejection:', exception);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    });

    if (typeof address === 'string') {
        loggerInstance.info(`Application has been launched on ${address}`);
    } else {
        loggerInstance.info(`Application has been launched on ${address.port} port`);
    }
});
//# sourceMappingURL=main.js.map