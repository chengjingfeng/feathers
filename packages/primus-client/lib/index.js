const Service = require('feathers-socket-commons/client');

module.exports = function (connection, options) {
  if (!connection) {
    throw new Error('Primus connection needs to be provided');
  }

  const defaultService = function (name) {
    return new Service(Object.assign({}, options, {
      name,
      connection,
      method: 'send'
    }));
  };

  const initialize = function () {
    if (typeof this.defaultService === 'function') {
      throw new Error('Only one default client provider can be configured');
    }

    this.primus = connection;
    this.defaultService = defaultService;
  };

  initialize.Service = Service;
  initialize.service = defaultService;

  return initialize;
};
