import axios from 'axios';
import * as Sentry from '@sentry/node';

class CaptchaClient {
  apiKey = '';

  constructor() {
    this.apiKey = process.env.RECAPTCHA_API_KEY || '';
  }

  verifyCaptcha = async (captchaToken: string) => {
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${this.apiKey}&response=${captchaToken}`;
    try {
      const response = await axios(verificationUrl);
      return Boolean(response.data.success);
    } catch (error) {
      Sentry.captureException(error);
      return false;
    }
  }
}

export default CaptchaClient;
