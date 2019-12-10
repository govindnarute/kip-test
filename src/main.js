// eslint-disable-next-line node/no-extraneous-import
import 'source-map-support/register';

// normalize NODE_ENV variable
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

import http from 'http';
import config from 'config';
import { App } from './routes/App';
import { DIContainerFactory } from './DIContainerFactory';

const port = config.get('server.port');
const container = DIContainerFactory.createContainer();
const application = new App(container);
const server = http.createServer(application);

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
        loggerInstance.info(
            `Application has been launched on ${address.port} port`
        );
    }
});
