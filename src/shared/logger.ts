import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";

export const loggerOptions = {
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike('SUN', { prettyPrint: true })
        )
      })
    ]
  };