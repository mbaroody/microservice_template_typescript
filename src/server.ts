import * as Hapi from 'hapi';
import * as HapiSwagger from 'hapi-swagger';
import Logger from './common/logger';
import routes from './routes';
console.log('fuckkkkkkkkkkkkkkkkkkkk: ', routes);

export default (async () => {
  const server = await new Hapi.Server({
    host: process.env.HOST,
    port: process.env.PORT
  });

  const hapiSwaggerOptions = {
    info: {
      title: 'API Documentation',
      version: '0.0.1',
    },
    documentationPage: false,
    swaggerUI: false
  };

  server.events.on('route', (route: any) => {
    console.log('registered a route', route.path);
  });

  await server.register([{
    plugin: HapiSwagger,
    options: hapiSwaggerOptions
  }]);

  server.route(routes);

  try {
    await server.start();
    Logger.info('Server running at:', server.info.uri);
  } catch(err) {
    Logger.error(err);
  }
})();
