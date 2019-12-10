import { GatewayTimeOutError } from '../http';

export class TimeoutCounterFactory {
    /**
     * @return {function(*, *, *)}
     */
    static startCounter({ config }) {
        return (req, res, next) => {
            setTimeout(() => {
                if(!res.finished) {
                    return next(new GatewayTimeOutError());
                }
            }, config.server.timeOut);

            next();
        };
    }
}
