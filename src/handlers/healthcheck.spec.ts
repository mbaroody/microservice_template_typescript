import * as chai from 'chai';
const expect = chai.expect;
import * as Sinon from 'sinon';

import HealthcheckHandler from './healthcheck';

describe('healthcheckHandler', function() {

  before('instantiate healthcheck handler', function() {
    this.logger = {
      info: function(msg) { },
      error: function(msg) { }
    };
    this.healthcheckHandler = new HealthcheckHandler(this.logger);
  });

  it('mocks and healthcheck handler should instantiate correctly', function() {
    expect(this.healthcheckHandler).to.exist;
  });

  describe('handle', function() {
    before('create mock request, h, and logger objects', function() {
      this.request = {
        method: 'get',
        path: '/healthcheck',
        info: { remoteAddress: '127.0.0.1', remotePort: '6969' }
      };
      this.h = {
        response: function() {
          return { statusCode: 69 };
        }
      };
    });

    it('should log remoteAddress and remotePort on get requests', function() {
      const loggerInfoSpy = Sinon.spy(this.logger, 'info');
      this.healthcheckHandler.handle(this.request, this.h);
      const loggerInfoSpyArgs = loggerInfoSpy.args;
      expect(loggerInfoSpyArgs.length).to.equal(1);
      expect(loggerInfoSpyArgs[0].length).to.equal(1);
      expect(loggerInfoSpyArgs[0][0]).to.equal(`Received ${this.request.method.toUpperCase()} ${this.request.path} request from ` +
        `${this.request.info.remoteAddress}:${this.request.info.remotePort}.`);
    });

    it('should call h.response() once', function() {
      const hResponseSpy = Sinon.spy(this.h, 'response');
      this.healthcheckHandler.handle(this.request, this.h);
      expect(hResponseSpy.calledOnce).to.be.true;
    });

    it('should return response object with statusCode 204', function() {
      const response = this.healthcheckHandler.handle(this.request, this.h);
      expect(response.statusCode).to.equal(204);
    });
  });
});
