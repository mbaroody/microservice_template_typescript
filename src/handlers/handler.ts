export default abstract class Handler {

  constructor(protected logger: any) { };

  protected abstract handleAction(request: any, h: any): any;

  public handle(request: any, h: any): any {
    if (request.method === 'put' ||  request.method === 'post') {
      this.logger.info(`Received ${request.method.toUpperCase()} ${request.path} request with ` +
        `payload: ${JSON.stringify(request.payload, null, '  ')} from ` +
        `${request.info.remoteAddress}:${request.info.remotePort}.`);
    } else {
      this.logger.info(`Received ${request.method.toUpperCase()} ${request.path} request from ` +
      `${request.info.remoteAddress}:${request.info.remotePort}.`);
    }
    return this.handleAction(request, h);
  };
};
