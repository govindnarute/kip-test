import * as winston from 'winston';
import config from 'config';
import { CustomError } from '../http';

/**
 * @type {string}
 */
const defaultLabel = 'RUNTIME';

export class LoggerFactory {
    /**
     * @param {string} label
     * @returns {winston.Logger}
     */
    static createLogger(label = defaultLabel) {
        const customLevels = {
            levels: {
                error: 0,
                info: 1,
                warn: 2,
                di: 3,
                trace: 4,
                sql: 5,
                swagger: 6,
                debug: 7,
            },
            colors: {
                error: 'red',
                info: 'green',
                warn: 'yellow',
                di: 'magenta',
                trace: 'grey',
                sql: 'cyan',
                swagger: 'cyan',
                debug: 'blue',
            }
        };
        const customFormat = winston.format.printf(info => {

            if(info.message instanceof CustomError) {
                return `${info.timestamp} [${info.label}] ${info.level}: ${info.message.stack}`;
            }

            let message = info.message;
            if (typeof info.message === 'object') {
                message = JSON.stringify(info.message);
            }
            let meta = '';
            const environment = process.env.NODE_ENV;
            const dbConfig = Object.assign({}, config.get(environment));
            if (typeof info.meta === 'object' && info.label !== dbConfig.label) {
                meta = JSON.stringify(info.meta);
            }
            return `${info.timestamp} [${info.label}] ${info.level}: ${message} ${meta}`;
        });

        let format = winston.format.combine(
            winston.format.colorize(),
            winston.format.label({ label }),
            winston.format.timestamp(),
            winston.format.splat(),
            customFormat
        );
        // Incorrectly log requests for prod
        // if (true === config.get('production')) {
        //     format = winston.format.combine(
        //         winston.format.label({ label }),
        //         winston.format.timestamp(),
        //         winston.format.json(),
        //     );
        // }

        winston.addColors(customLevels.colors);
        return winston.createLogger({
            format,
            level: 'debug',
            levels: customLevels.levels,
            transports: [new winston.transports.Console({
                label
            })],
            exitOnError: false
        });
    }
}
