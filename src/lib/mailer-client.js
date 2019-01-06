import Queue from 'bull';
import Mailer from 'nodemailer';

let mailerQueue = undefined;
const transporter = Mailer.createTransport({
  host: process.env.MAILER_HOST,
  port: 587,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});


export const sendMail = (mailOptions: Mailer.SendMailOptions) => {
  if (!mailerQueue) {
    mailerQueue = new Queue('mailerQueue', process.env.REDIS_URL);
    mailerQueue.process((job, done) => {
      transporter.sendMail(job.data, (error, info) => {
        if (error) {
          return done(error);
        }
        return done(info);
      });
    });
  }
  return mailerQueue.add(mailOptions);
};
