import winston from "winston";
import { ecsFormat } from '@elastic/ecs-winston-format';

const logger = winston.createLogger({
    format: ecsFormat({ convertReqRes: true }),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
})

export default logger;