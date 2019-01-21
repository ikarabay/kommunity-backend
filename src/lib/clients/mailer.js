import sgMail from '@sendgrid/mail';
import Queue from '$/lib/queue';

class MailerClient {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    this.queue = new Queue('MailerQueue', this.processRequest);
  }

  processRequest = async (mailOptions, done) => {
    const msg = {
      to: 'selmanhalid@gmail.com',
      from: 'hi@kommunity.app',
      subject: 'testing',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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

  sendMail = (mailOptions: Mailer.SendMailOptions) => {
    return this.queue.add(mailOptions);
  }
}

export default MailerClient;
