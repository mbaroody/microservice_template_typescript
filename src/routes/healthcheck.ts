import HealthcheckHandler from '../handlers/healthcheck';
import Logger from '../common/logger/index';

const healthcheckHandler = new HealthcheckHandler(Logger);

export default [{
  path: '/healthcheck',
  method: 'GET',
  options: {
    handler: function(request: any, h: any) { return healthcheckHandler.handle(request, h); },
    tags: ['api']
  }
}];
