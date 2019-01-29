/* eslint-disable no-console, no-underscore-dangle, no-empty */
import pg from 'pg';

export const CHANNELS = {
  CHAT_MESSAGE_NOTIFICATIONS: 'chat_message_notifications',
};

// TODO consider using something more complex like
// https://github.com/andywer/pg-listen/blob/master/src/index.ts
// or
// https://github.com/GraphQLCollege/graphql-postgres-subscriptions
// or (this one looks pretty well)
// https://github.com/voxpelli/node-pg-pubsub
class PostgreListener {
  constructor(channel, onNotify) {
    this.channel = channel;
    this.onNotify = onNotify;
    this.init();
  }

  init = async () => {
    this.client = new pg.Client(process.env.DATABASE_URL);
    await this.client.connect();
    // TODO log to sentry
    // TODO check for production before logging
    this.client.on('error', (err) => {
      console.error('POSTGRE_PUBSUB_FAILED', err.stack);
    });
    this.client.on('notification', this.onNotification);
    this.listen();
  }

  listen = async () => {
    const statement = `LISTEN ${this.client.escapeIdentifier(this.channel)}`;
    await this.client.query(statement);
  }

  notify = async (msg: string) => {
    if (!msg) {
      return;
    }
    const encodedMsg = typeof payload !== 'string' ? JSON.stringify(msg) : msg;
    const statement = `NOTIFY ${this.client.escapeIdentifier(this.channel)}, ${this.client.escapeLiteral(encodedMsg)}`;
    await this.client.query(statement);
  };

  onNotification = ({ payload }) => {
    let decodedPayload = payload;
    try {
      decodedPayload = JSON.parse(payload);
    } catch (err) {}
    // TODO consider using debug npm package to avoid these prod checks in many files
    if (process.env.NODE_ENV !== 'production') {
      console.log(`DB notification on channel: ${this.channel}, payload:`);
      console.log(decodedPayload);
    }
    if (this.onNotify) {
      this.onNotify(decodedPayload);
    }
  };
}

export default PostgreListener;
