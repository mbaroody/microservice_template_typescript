import * as Winston from 'winston';

const Console = new Winston.transports.Console();
const Logger = new Winston.Logger({
  transports: [ Console ]
});

// if not in production environment, log to console only
// if (process.env.NODE_ENV !== 'production') {
//   logger.clear();
//   logger.add(Winston.transports.Console);
// }

if (process.env.NODE_ENV === 'test') {
  Logger
    .remove(Console);
}

export default Logger;
