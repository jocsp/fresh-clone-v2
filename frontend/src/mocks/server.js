import { setupServer } from 'msw/node';
import { rest } from 'msw';
// import { handlers } from './handlers.js';

export const createServer = (handlerConfig) => {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || 'get'](config.url, (req, res, ctx) => {
      return res(ctx.json(config.res));
    });
  });
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

export const createCustomServer = (handlerConfig) => {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || 'get'](config.url, config.res);
  });
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

// export const server = setupServer(...handlers);
