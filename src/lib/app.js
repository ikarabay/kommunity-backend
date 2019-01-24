/* eslint-disable no-console */
import type { Server } from 'http';
import get from 'lodash/get';
import path from 'path';
import { execute, subscribe } from 'graphql';
import Express from 'express';
import Sequelize from 'sequelize';
import { ApolloServer } from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server';
import Cors from 'cors';
import CookieParser from 'cookie-parser';
import { getUserFromToken } from '$/auth/lib';
import { makeExecutableSchema } from 'graphql-tools';
import Morgan from 'morgan';
import type { Sentry } from '@sentry/node';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import helmet from 'helmet';

import config from '$/config';
import DbClient, { importModels } from './clients/db';
import MailerClient from './clients/mailer';

import gqlSchema from '$/graphql/schema';
import gqlResolvers from '$/graphql/resolvers';

export default class App {
  httpServer: ?Server;
  modelsPath: string;
  config: AppConfig;
  express: express$Application;
  sequelize: Sequelize;
  models: AppModels;
  clients: AppClients;

  constructor() {
    this.config = config;

    const srcPath = path.join(path.resolve(), 'src');
    this.modelsPath = path.join(srcPath, 'models');

    this.clients = {
      mailer: new MailerClient(),
    };

    // initialize the app
    this.initExpressApp();
  }

  initExpressApp = (): void => {
    // eslint-disable-next-line
    const sentry: Sentry = require('@sentry/node');
    const {
      publicFolderPath, viewEngine, viewFolderPath, sentry: sentryConfig, morgan: morganConfig,
    } = this.config.server;
    this.express = Express();

    this.express.set('view engine', viewEngine);
    this.express.set('views', path.join(__dirname, viewFolderPath));

    if (sentryConfig) {
      const {
        dsn, debug, environment, sampleRate, attachStacktrace,
      } = sentryConfig;
      // Error Handling
      sentry.init({
        dsn,
        debug,
        environment,
        sampleRate,
        attachStacktrace,
      });
      // The request handler must be the first middleware on the app
      this.express.use(sentry.Handlers.requestHandler());
    }

    // SECURITY
    this.express.use(helmet({
      frameguard: {
        action: 'deny',
      },
    }));
    // TODO update cors policy
    this.express.use(Cors(this.getCorsOptions()));

    this.express.use(Morgan(morganConfig.format, morganConfig.options));
    this.express.use(Express.json());
    this.express.use(Express.urlencoded({ extended: false }));
    this.express.use(CookieParser());
    this.express.use(Express.static(path.join(path.resolve(), publicFolderPath)));

    this.initDbClient();
    this.initModels();
    this.initRoutes();
    this.startServer();

    // eslint-disable-next-line
    this.express.use((req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      res.statusCode = 404;
      res.json({ message: 'not_found' });
    });

    if (sentryConfig) {
      // The error handler must be before any other error middleware
      this.express.use(sentry.Handlers.errorHandler());
    }

    // Optional fallthrough error handler
    // eslint-disable-next-line
    this.express.use((err: Error, req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      res.statusCode = 500;
      // eslint-disable-next-line no-underscore-dangle
      res.json({ message: 'internal_error', eventId: sentry.getCurrentHub()._lastEventId });
    });
  };

  initDbClient = (): void => {
    if (process.env.NODE_ENV !== 'test'
      && typeof process.env.DATABASE_URL !== 'string') {
      throw new Error('Database connecting string is missing!');
    }
    this.sequelize = DbClient(process.env.DATABASE_URL || '');
  };

  initModels = (): void => {
    this.models = importModels(this.modelsPath, this.sequelize);
  };

  initRoutes = (): void => {
    const router: express$Router = Express.Router();
    router.get('/health', (req: exExpress$Request, res: express$Response) => {
      res.end('OK');
    });
    this.express.use('/', router);
  };

  startServer = (): void => {
    // APOLLO SERVER
    const schemaConf = {
      context: async ({ req, res }) => {
        const token = req.cookies.authorization;
        let user;
        if (token) {
          try {
            user = await getUserFromToken(token);
          } catch (error) {
            throw new AuthenticationError();
          }
        }
        return {
          setCookie: (name, value, opts) => res.cookie(name, value, opts),
          removeCookie: name => res.clearCookie(name),
          user,
        };
      },
      resolvers: gqlResolvers(this),
      typeDefs: gqlSchema,
    };
    const schema = makeExecutableSchema(schemaConf);
    const apolloServer = new ApolloServer(schemaConf);
    apolloServer.applyMiddleware({
      app: this.express,
      // required for auth cookies
      cors: this.getCorsOptions(),
    });

    // EXPRESS + WebSocket Server
    const port = get(process, 'env.PORT') || this.config.server.port;
    // listen() returns http server express creates internally
    this.httpServer = this.express.listen({ port }, () => {
      SubscriptionServer.create({
        execute,
        schema,
        subscribe,
        // TODO use onConnect to validate user
      }, {
        server: this.httpServer,
      });
      console.log(`EXPRESS 🎢  Server is ready at http://localhost:${port}`);
      console.log(`GRAPHQL 🚀  Server ready at http://localhost:${port}/graphql`);
    });
  }

  getCorsOptions = () => {
    return {
      origin: this.config.server.allowedCorsOrigins,
      // required for auth cookies
      credentials: true,
    };
  }
}
