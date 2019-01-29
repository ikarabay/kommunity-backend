import path from 'path';
import Sequelize from 'sequelize';
import { getAllFiles } from '../helpers';

import PostgreListener, { CHANNELS } from './db/postgre-listener';

const srcPath = path.join(path.resolve(), 'src');
const modelsPath = path.join(srcPath, 'models');

class DbClient {
  listeners: AppDbClientListeners;
  sequelize: Sequelize;
  models: AppModels;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL || '';
    if (!databaseUrl) {
      throw new Error('Database connecting string is missing!');
    }

    this.sequelize = new Sequelize(databaseUrl, {
      logging: function logging(query) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line
          console.log(query);
        }
      },
    });
    this.models = this.importModels();

    // Listeners use PostgreSQL LISTEN/NOTIFY commands to listen channels,
    //   and get notified about events (insert/update/delete etc).
    // Here is how the flow works:
    // - user sends a message
    // - new row is created in db
    // - pgsql NOTIFY event is fired
    // - PostgreListener catches it, and publishes an event to pubsub instance
    // - all active listeners (users with websocket connections) will be notified
    this.listeners = {
      chatMessage: new PostgreListener(databaseUrl, CHANNELS.CHAT_MESSAGE_NOTIFICATIONS),
    };
  }

  importModels = (): AppModels => {
    const models: $Shape<AppModels> = {};
    const associates = [];

    getAllFiles(modelsPath, [])
      .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        const model = this.sequelize.import(path.join(file));
        models[model.name] = model;
        associates.push(model);
      });

    associates.forEach((model) => {
      if (model.associate) {
        model.associate(models);
      }
    });

    return models;
  }
}

export default DbClient;
