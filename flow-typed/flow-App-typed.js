import { type Options as SequelizeOptions, Sequelize } from 'sequelize';
import { type PostgreListener } from '../src/lib/clients/db/postgre-listener';

declare module 'config' {
  declare module.exports: any;
}

declare module '$/../scripts/app/config' {
  declare module.exports: any;
}
declare module '$/lib/App' {
  declare module.exports: any;
}
declare type AppConfigEnv = {
  current: string
};

declare type AppServerSentryConfig = {
  dsn: string,
  debug: boolean,
  environment: string,
  sampleRate: number,
  attachStacktrace: boolean
};
declare type AppServerMorganConfig = {
  format: string,
  options?: {}
};
declare type AppServerSecretsConfig = {
  jwt: string
};
declare type AppServerConfig = {
  allowedCorsOrigins: string[],
  port: number | string,
  hostname: string,
  secrets: AppServerSecretsConfig,
  sentry: AppServerSentryConfig,
  morgan: AppServerMorganConfig,
  viewEngine: string,
  viewFolderPath: string,
  publicFolderPath: string
};
declare type AppGqlServerConfig = {
  port: number | string,
  rootPath: string,
  playgroundPath: string
};
declare type AppConfig = {
  server: AppServerConfig,
  db: SequelizeOptions,
  gqlServer: AppGqlServerConfig
};
declare type AppUser = {
  uuid: string
};

declare type AppModels = {
  User: any,
  Event: any,
  UserEvent: any,
  Community: any,
  CommunityUser: any,
  ConversationCategory: any,
  ConversationPost: any,
  UploadedItem: any,
  Message: any,
  Channel: any,
};

declare type AppMailerClient = {
  addRecipient: Function,
  sendMail: Function,
}

declare type AppCaptchaClient = {
  verifyCaptcha: (string) => Promise<boolean>,
}

declare type AppDbClientListeners = {
  chatMessage: PostgreListener
}

declare type AppDbClient = {
  listeners: AppDbClientListeners,
  sequelize: Sequelize,
  models: AppModels,
}

declare type AppClients = {
  captcha: AppCaptchaClient,
  db: AppDbClient,
  mailer: AppMailerClient,
};
