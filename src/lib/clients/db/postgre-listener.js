/* eslint-disable no-console, no-underscore-dangle, no-empty */
import pg from 'pg';
import type { Client } from 'pg';
import * as Sentry from '@sentry/node';

export const CHANNELS = {
  CHAT_MESSAGE_NOTIFICATIONS: 'chat_message_notifications',
};

export type ChatMessageType = {
  uuid: string,
  channelUuid: string,
  senderUuid: string,
  text: string,
};

export type PayloadType = {
  timestamp: string,
  operation: string,
  schema: string,
  table: string,
  data: ChatMessageType,
};

type onNotifyType = (PayloadType) => void;

// TODO consider using something more complex like
// https://github.com/andywer/pg-listen/blob/master/src/index.ts
// or
// https://github.com/GraphQLCollege/graphql-postgres-subscriptions
// or (this one looks pretty well)
// https://github.com/voxpelli/node-pg-pubsub
class PostgreListener {
  subscribers: Array<onNotifyType>;
  channel: string;
  databaseUrl: string;
  client: Client;

  constructor(databaseUrl: string, channel: string) {
    this.channel = channel;
    this.databaseUrl = databaseUrl;
    this.subscribers = [];
    this.init();
  }

  init = async () => {
    console.log('1');
    this.client = new pg.Client(this.databaseUrl);
    await this.client.connect();
    console.log('2');
    this.client.on('error', (err) => {
      console.log('2a');
      if (process.env.NODE_ENV !== 'production') {
        console.error('POSTGRE_PUBSUB_FAILED', err);
      }
      Sentry.captureException(err);
    });
    console.log('3');
    this.client.on('notification', this.onNotification);
    this.listen();
    console.log('4');
  }

  listen = async () => {
    console.log('5');
    const statement = `LISTEN ${this.client.escapeIdentifier(this.channel)}`;
    await this.client.query(statement);
    console.log('6');
  }

  subscribe = (subscriber: onNotifyType) => {
    console.log('7');
    this.subscribers.push(subscriber);
  }

  // Database trigger actually notifies about events
  // Keeping below code in case we need it
  /*
  notify = async (msg: string) => {
    if (!msg) {
      return;
    }
    const encodedMsg = typeof msg !== 'string' ? JSON.stringify(msg) : msg;
    const statement = `NOTIFY ${this.client.escapeIdentifier(this.channel)}, ${this.client.escapeLiteral(encodedMsg)}`;
    await this.client.query(statement);
  };
  */

  onNotification = ({ payload }: { payload: string }) => {
    console.log('8');
    try {
      const decodedPayload = JSON.parse(payload);
      // TODO consider using debug npm package to avoid these prod checks in many files
      if (process.env.NODE_ENV !== 'production') {
        console.log(`DB notification on channel: ${this.channel}, payload:`);
        console.log(decodedPayload);
      }
      console.log('9');
      this.subscribers.forEach(subscriber => subscriber(decodedPayload));
    } catch (error) {
      console.log('10');
      Sentry.captureException(error);
    }
  };
}

export default PostgreListener;
