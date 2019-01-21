import sgMail from '@sendgrid/mail';
import Queue from '$/lib/queue';

type MailOptionsType = {
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string,
};

class MailerClient {
  queue = null;

  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY || '';
    if (apiKey) {
      sgMail.setApiKey(apiKey);
      this.queue = new Queue('MailerQueue', this.processRequest);
    }
  }

  processRequest = async (options: MailOptionsType, done: (any) => {}) => {
    const msg = {
      to: options.to,
      from: options.from,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };
    try {
      const response = await sgMail.send(msg);
      return done(response);
    } catch (error) {
      // TODO use sentry?
      // eslint-disable-next-line
      console.log(error);
      return done(error);
    }
  }

  sendMail = (options: MailOptionsType) => {
    if (this.queue) {
      this.queue.add(options);
    }
  }
}

export default MailerClient;
