import path from 'path';
import Sequelize from 'sequelize';
import { getAllFiles } from '../helpers';

const srcPath = path.join(path.resolve(), 'src');
const modelsPath = path.join(srcPath, 'models');

class DbClient {
  constructor() {
    if (process.env.NODE_ENV !== 'test'
      && typeof process.env.DATABASE_URL !== 'string') {
      throw new Error('Database connecting string is missing!');
    }

    this.sequelize = new Sequelize(process.env.DATABASE_URL || '', {
      logging: function logging(query) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line
          console.log(query);
        }
      },
    });
    this.models = this.importModels();
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
