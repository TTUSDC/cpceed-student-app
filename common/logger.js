const logger = require('loglevel');

// Checks current build environment
let envLevel = null;
switch (ENV) {
  case 'prod':
    envLevel = 'error';
    break;
  case 'dev':
    envLevel = 'debug';
    break;
  default:
    envLevel = 'debug';
}

// Adding date prefix
const originalFactory = logger.methodFactory;
logger.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return (message) => {
    rawMethod(`${new Date()}: ${message}`);
  };
};
// Set level and apply plugin
logger.setLevel(envLevel);

module.exports = logger;
