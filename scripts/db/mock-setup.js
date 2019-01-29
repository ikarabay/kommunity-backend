/* eslint-disable no-console */
import Sequelize from 'sequelize';
import DbClient from '$/lib/clients/db';

if (['development', 'staging'].indexOf(process.env.NODE_ENV) > -1) {
  const dbClient: Sequelize = new DbClient().sequelize;

  console.log('\n>>> CREATING DB TABLES\n');

  dbClient.sync({ force: true })
    .then(() => {
      console.log('\n>>> DB TABLE SETUP IS COMPLETED\n');
      process.exit();
    })
    .catch((err) => {
      console.log('\n>>> DB TABLE SETUP FAILED!!!\n');
      console.log(err);
      process.exit(1);
    });
}
