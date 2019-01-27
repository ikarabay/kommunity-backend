import { ApolloError, AuthenticationError } from 'apollo-server';
import md5 from 'md5';
import moment from 'moment';
import { PubSub, withFilter } from 'graphql-subscriptions';
import uuid from 'uuid';
import validator from 'validator';

import type App from '$/lib/app';
import config from '$/config';
import {
  AUTH_TOKEN_EXPIRE_IN_SECONDS, TOKEN_TYPE, generateTokenForUser, getUserFromToken,
} from '$/auth/lib';

export const pubsub = new PubSub();

const COMMUNITY_VISIBILITY_PUBLIC = 'public';
const MESSAGES_PAGE_SIZE = 20;

export default (app: App) => {
  const Query = {
    getChannels: (parent: {}, args: {communityUUID: string}) => {
      /* TODO bariscc: check if user has permission */
      return app.models.Channel.findAll({
        where: { community_uuid: args.communityUUID },
      });
    },
    getMessagesForChannel: (parent: {}, args: {channelUUID: string, cursor: number}) => {
      const cursor = args.cursor ? args.cursor : 0;

      return {
        messages: app.models.Message.findAll({
          where: { channel_uuid: args.channelUUID },
          include: [
            {
              model: app.models.User, as: 'sender',
            },
          ],
          offset: MESSAGES_PAGE_SIZE * cursor,
          limit: MESSAGES_PAGE_SIZE,
        }),
        nextCursor: cursor + 1,
      };
    },
    getCommunityEvents: (parent: {}, args: { communityUuid: uuid }) => {
      // returns community events for given community id
      return app.models.Event.findAll({
        where: { communityUuid: args.communityUuid },
      });
    },
    getUserEvents: async (parent: {}, args: { userUuid: uuid }) => {
      // returns all events for given user uuid
      const user = await app.models.User.findOne({
        include: [
          {
            as: 'events',
            model: app.models.Event,
          },
        ],
        where: { uuid: args.userUuid },
      });
      return user.get('events');
    },
    getCommunityMembers: (parent: {}, args: { uuid: uuid }) => {
      // returns community members for given community id
      return app.models.Community.findOne({
        include: [
          {
            model: app.models.User, as: 'users',
          },
        ],
        where: { uuid: args.uuid },
      });
    },
    getLoggedInUserDetails: (parent: {}, args: {}, { user }: {user: AppUser}) => {
      return app.models.User.findOne({
        include: [{ as: 'communities', model: app.models.Community }],
        where: { uuid: user.uuid },
      });
    },
    getUserDetailsByUuid: (parent: {}, args: { uuid: uuid }) => {
      return app.models.User.findOne({
        include: [{ model: app.models.Community }],
        where: { uuid: args.uuid },
      });
    },
    getLoggedInUserCommunities: (parent: {}, args: {}, user: AppUser) => {
      // returns user communities
      return app.models.Community.findAll({
        include: [
          {
            model: app.models.User,
            where: { uuid: user.uuid },
          },
        ],
      });
    },
    getUserCommunitiesByUuid: (parent: {}, args: { uuid: uuid }) => {
      // returns public user communities
      return app.models.Community.findAll({
        include: [
          {
            model: app.models.User,
            where: { uuid: args.uuid },
          },
        ],
        where: { visibility: COMMUNITY_VISIBILITY_PUBLIC },
      });
    },
    popularCommunities: () => {
      // returns communities with most members
      return app.models.Community.findAll({
        limit: 10,
        subQuery: false,
        attributes: [
          'uuid',
          'name',
          'tagline',
          'desc',
          'location',
          [app.sequelize.fn('COUNT', 'CommunityUser.userUuid'), 'userCount'],
        ],
        include: [
          {
            model: app.models.CommunityUser,
            attributes: [],
          },
        ],
        where: { visibility: COMMUNITY_VISIBILITY_PUBLIC },
        group: ['uuid'],
        order: [[app.sequelize.literal('"userCount"'), 'DESC']],
      }).map(data => data.toJSON());
    },
    searchCommunities: (parent: {}, args: { query: string }) => {
      const keywords = args.query.split(' ');
      const orQuery = keywords.map((text) => {
        return {
          $iLike: `%${text}%`,
        };
      });
      return app.models.Community.findAll({
        where: {
          $or: {
            name: {
              $or: orQuery,
            },
          },
        },
      });
    },
    searchUsers: (parent: {}, args: { query: string }) => {
      const keywords = args.query.split(' ');
      const orQuery = keywords.map((text) => {
        return {
          $iLike: `%${text}%`,
        };
      });
      return app.models.User.findAll({
        where: {
          $or: {
            firstName: {
              $or: orQuery,
            },
            lastName: {
              $or: orQuery,
            },
            username: {
              $or: orQuery,
            },
          },
        },
      });
    },
  };
  const Mutation = {
    // creates community and returns it
    createCommunity: (
      parent: {},
      args: {
        name: string,
        tagline: string,
        desc: string,
        location: string,
        tier: string,
        visibility: string,
      },
    ) => {
      // TODO avatarUploadUuid, socialLinks
      return app.models.Community.create({
        uuid: uuid(),
        name: args.name,
        tagline: args.tagline,
        desc: args.desc,
        location: args.location,
        tier: args.tier,
        visibility: args.visibility,
      });
    },
    forgotPassword: async (parent: {}, args: {
      email: string,
    }, { clients }: { clients: AppClients }) => {
      // check if there is a user with that email
      const user = await app.models.User.findOne({
        where: { email: args.email },
      });

      if (!user) {
        throw new AuthenticationError('There is no user registered with that email address, sorry.');
      }

      const userObj = user.get();

      await user.update({
        canResetPasswordBy: moment().add(
          config.server.security.resetPassword.linkExpireInSeconds, 'seconds',
        ),
      });

      // generate reset password jwt token
      const token = generateTokenForUser(
        userObj,
        TOKEN_TYPE.RESET_PASSWORD,
      );

      const { from, templateId } = config.server.emails.forgotPassword;
      clients.mailer.sendMail({
        from,
        tags: {
          resetPasswordURL: `${config.server.security.resetPassword.resetURL}?token=${token}`,
        },
        templateId,
        to: args.email,
      });
      return true;
    },
    resetPassword: async (parent: {}, args: {
      newPassword: string,
      token: string,
    }) => {
      let tokenUser;

      try {
        tokenUser = await getUserFromToken(args.token, TOKEN_TYPE.RESET_PASSWORD);
      } catch (error) {
        throw new AuthenticationError(
          'Your token is expired or invalid. Please go back to forgot password page, and try again.',
        );
      }

      // check if there is a user with that email
      const user = await app.models.User.findOne({
        where: { email: tokenUser.email },
      });

      if (!user) {
        throw new AuthenticationError('We couldn\'t find a registered user, sorry.');
      }

      if (!user.canResetPasswordBy) {
        throw new AuthenticationError(
          'Either you already changed your password, or link has expired. '
          + 'Please go back to forgot password page, and try again.',
        );
      }

      // $FlowFixMe
      const timeLeft = moment(user.canResetPasswordBy, moment.defaultFormat)
        .diff(moment(), 'seconds');
      const canReset = timeLeft > 0 && timeLeft < config.server.security.resetPassword.linkExpireInSeconds;

      if (!canReset) {
        throw new AuthenticationError(
          'Link has expired, please go back to forgot my password page and try again.',
        );
      }

      // all validations passed, update the user
      const newPasswordHash = md5(args.newPassword);
      await user.update({
        canResetPasswordBy: null,
        passwordHash: newPasswordHash,
      });

      // TODO consider sending reset successful email to the user
      return true;
    },
    login: async (parent: {}, args: {
      email: string,
      password: string
    }, { setCookie }: { setCookie: (string, string, Object) => void }) => {
      // check if there is a user with that email
      const user = await app.models.User.findOne({
        where: { email: args.email },
      });

      if (!user) {
        throw new AuthenticationError('Username and/or password is incorrect.');
      }

      const userObj = user.get();

      // check if their password is correct
      if (md5(args.password) !== userObj.passwordHash) {
        throw new AuthenticationError('Username and/or password is incorrect.');
      }

      // all good, generate the jwt token
      const token = generateTokenForUser(userObj, TOKEN_TYPE.AUTH);

      // TODO use signed param below?
      setCookie('authorization', token, {
        maxAge: AUTH_TOKEN_EXPIRE_IN_SECONDS * 1000, httpOnly: true,
      });
      return true;
    },
    logout: async (parent: {}, args: {}, { removeCookie }: { removeCookie: (string) => void }) => {
      removeCookie('authorization');
      return true;
    },
    signup: async (parent: {}, args: {
      email: string,
      password: string,
      captchaResponse: string
    }, { setCookie, clients }: { setCookie: (string, string, Object) => void, clients: AppClients }) => {
      // check captcha result before all
      if (!await clients.captcha.verifyCaptcha(args.captchaResponse)) {
        throw new AuthenticationError('Recaptcha verification failed, please refresh the page and try again.');
      }

      // input validations
      if (!validator.isEmail(args.email)) {
        throw new ApolloError('E-mail address must be valid.');
      }
      if (!validator.isLength(args.password, { min: 6 })) {
        throw new ApolloError('Password must be at least 6 characters long.');
      }

      // check if email already exists
      const exists = await app.models.User.findOne({
        where: { email: args.email },
      });
      if (exists) {
        throw new ApolloError('This e-mail address is already registered.');
      }

      // all validations passed, create the user
      const passwordHash = md5(args.password);
      const user = await app.models.User.create({
        uuid: uuid(),
        email: args.email,
        passwordHash,
      });
      const userObj = user.get();

      // Sending async confirmation email
      const { from, templateId } = config.server.emails.signupConfirmation;
      clients.mailer.sendMail({
        to: args.email,
        from,
        templateId,
        tags: {},
      });

      // all good, generate the jwt token
      const token = generateTokenForUser(userObj, TOKEN_TYPE.AUTH);

      // TODO use signed param below?
      setCookie('authorization', token, {
        maxAge: AUTH_TOKEN_EXPIRE_IN_SECONDS * 1000, httpOnly: true,
      });
      return true;
    },
    subscribeToMailList: async (parent: {}, args: {
      email: string,
      listId: string,
    }, { clients }: { clients: AppClients }) => {
      clients.mailer.addRecipient(args.email, args.listId);
      return true;
    },
    // CHAT
    sendMessage: (parent: {}, args: {
      channelUUID: string,
      senderUUID: string,
      text: string,
    }) => {
      /* TODO bariscc: sanitize text */
      const message = app.models.Message.create({
        uuid: uuid(),
        channelUuid: args.channelUUID,
        senderUuid: args.senderUUID,
        text: args.text.slice(0, 100),
      });
      pubsub.publish('MESSAGE_SENT', { messageSent: message });
      return message;
    },
  };

  const Subscription = {
    messageSent: {
      subscribe: withFilter(() => pubsub.asyncIterator('MESSAGE_SENT'), (payload, variables) => {
        return payload.messageSent.channelUUID === variables.channelUUID;
      }),
    },
  };

  return {
    Query,
    Mutation,
    Subscription,
  };
};
