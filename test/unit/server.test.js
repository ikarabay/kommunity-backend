/* global jest */
import http from 'http';
import SequelizeMock from 'sequelize-mock';

const app = require('$/server');

const mockSequelize = new SequelizeMock();

jest.mock('../../src/lib/clients/db', () => {
  return jest.fn().mockImplementation(() => {
    return {
      listeners: { chatMessage: { subscribe: () => {} } },
      sequelize: mockSequelize,
    };
  });
});

test('server returns 404', (done) => {
  http.get('http://localhost:4008/unknown-route', (res) => {
    expect(res.statusCode).toBe(404);
    done();
  });
});

test('server - /health returns OK', (done) => {
  http.get('http://localhost:4008/health', (res) => {
    expect(res.statusCode).toBe(200);

    let response = '';
    res.on('data', (chunk) => {
      response += chunk;
    });

    res.on('end', () => {
      expect(response).toBe('OK');
      done();
    });
  });
});

afterAll((done) => {
  app.httpServer.close(done);
});
