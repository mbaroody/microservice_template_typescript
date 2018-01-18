import Handler from './handler';

export default class HealthcheckHandler extends Handler {
  constructor(logger: any) {
    super(logger);
  };

  protected handleAction(request: any, h: any) {
    // const reply =
    // reply().code(204);
    const response = h.response();
    response.statusCode = 204;
    return response;
  };
};
