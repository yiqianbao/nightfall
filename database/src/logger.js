/* eslint-disable camelcase */
/* eslint-disable import/no-commonjs */

import { createLogger, format, transports } from 'winston';
import fs from 'fs';

import 'winston-daily-rotate-file';

const { enable_logger } = require('./config').getProps();

const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

module.exports = createLogger({
  level: 'debug',
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});

if (!enable_logger) {
  module.exports = {
    info: message => console.log(message),
    error: message => console.error(message),
  };
}
