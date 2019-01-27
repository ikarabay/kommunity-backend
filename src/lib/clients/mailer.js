import client from '@sendgrid/client';
import * as Sentry from '@sentry/node';
import sgMail from '@sendgrid/mail';

import Queue from '$/lib/queue';

type SendMailArgsType = {
  to: string,
  from: string,
  templateId: string,
  tags?: {[string]: string},
};

type TaskDetailsType = {
  type: string,
  args: Object
};

const addRecipientRequest = email => ({
  body: [{ email }],
  method: 'POST',
  url: '/v3/contactdb/recipients',
});

const addRecipientToListRequest = (recipientId, listId) => ({
  body: [recipientId],
  method: 'POST',
  url: `/v3/contactdb/lists/${listId}/recipients`,
});

class MailerClient {
  queue = null;

  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY || '';
    if (apiKey) {
      client.setApiKey(apiKey);
      sgMail.setApiKey(apiKey);
      this.queue = new Queue('MailerQueue', this.processRequest);
    }
  }

  processRequest = async (taskDetails: TaskDetailsType, done: (any) => {}) => {
    try {
      if (taskDetails.type === 'addRecipient') {
        const { email, listId } = taskDetails.args;
        const [, body] = await client.request(addRecipientRequest(email));
        const recipientId = body.persisted_recipients[0];
        await client.request(addRecipientToListRequest(recipientId, listId));
      } else if (taskDetails.type === 'sendMail') {
        await sgMail.send(taskDetails.args);
      }
      return done();
    } catch (error) {
      Sentry.captureException(error);
      return done(error);
    }
  }

  getSendMailOpts = (options: SendMailArgsType) => ({
    type: 'sendMail',
    args: {
      to: options.to,
      from: options.from,
      templateId: options.templateId,
      dynamic_template_data: options.tags,
    },
  })

  getAddRecipientOpts = (email: string, listId: string) => ({
    type: 'addRecipient',
    args: {
      email,
      listId,
    },
  })

  sendMail = (options: SendMailArgsType) => {
    if (this.queue) {
      this.queue.add(this.getSendMailOpts(options));
    }
  }

  addRecipient = (email: string, listId: string) => {
    if (this.queue) {
      this.queue.add(this.getAddRecipientOpts(email, listId));
    }
  }
}

export default MailerClient;
