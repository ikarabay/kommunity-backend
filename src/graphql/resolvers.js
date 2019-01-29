import { ApolloError, AuthenticationError } from 'apollo-server';
import md5 from 'md5';
import moment from 'moment';
import { PubSub, withFilter } from 'graphql-subscriptions';
import uuid from 'uuid/v4';
import validator from 'validator';

import config from '$/config';
import {
  AUTH_TOKEN_EXPIRE_IN_SECONDS, TOKEN_TYPE, generateTokenForUser, getUserFromToken,
} from '$/auth/lib';
import PostgreListener, { CHANNELS } from '$/lib/clients/db/postgre-listener';

const COMMUNITY_VISIBILITY_PUBLIC = 'public';
const MESSAGES_PAGE_SIZE = 20;

export default (clients: AppClients) => {
  const { captcha: captchaClient, db: { models, sequelize }, mailer: mailerClient } = clients;

  const Query = {
    getChannels: (parent: {}, args: {communityUuid: string}) => {
      /* TODO bariscc: check if user has permission */
      return models.Channel.findAll({
        where: { communityUuid: args.communityUuid },
      });
    },
    getMessagesForChannel: (parent: {}, args: {channelUuid: string, cursor: number}) => {
      const cursor = args.cursor ? args.cursor : 0;

      return {
        messages: models.Message.findAll({
          where: { channel_uuid: args.channelUuid },
          include: [
            {
              model: models.User, as: 'sender',
            },
          ],
          offset: MESSAGES_PAGE_SIZE * cursor,
          limit: MESSAGES_PAGE_SIZE,
        }),
        nextCursor: cursor + 1,
      };
    },
    getCommunityEvents: (parent: {}, args: { communityUuid: uuid, limit: number }) => {
      // returns community events for given community id
      return models.Event.findAll({
        where: { communityUuid: args.communityUuid },
        limit: args.limit || 10,
      });
    },
    getUserEvents: async (parent: {}, args: { userUuid: uuid }) => {
      // returns all events for given user uuid
      const user = await models.User.findOne({
        include: [
          {
            as: 'events',
            model: models.Event,
          },
        ],
        where: { uuid: args.userUuid },
      });
      return user.get('events');
    },
    getCommunityMembers: (parent: {}, args: { uuid: uuid }) => {
      // returns community members for given community id
      return models.Community.findOne({
        include: [
          {
            model: models.User, as: 'users',
          },
        ],
        where: { uuid: args.uuid },
      });
    },
    getCommunityMostActiveMembers: async (parent: {}, args: { communityUuid: uuid }) => {
      const limit = 10;
      // TODO limit doesnt work with below query, consider updating
      // returns community members for given community id
      const community = await models.Community.findOne({
        include: [
          {
            model: models.User,
            as: 'users',
          },
          {
            model: models.CommunityUser,
          },
        ],
        // Sorting by users.CommunityUser.reputation column
        order: [
          [
            { model: models.User, as: 'users' },
            { model: models.CommunityUser },
            'reputation',
            'DESC',
          ],
        ],
        where: { uuid: args.communityUuid },
      });
      return community ? community.users.slice(0, limit) : [];
    },
    getLoggedInUserDetails: (parent: {}, args: {}, { user }: {user: AppUser}) => {
      return models.User.findOne({
        include: [{ as: 'communities', model: models.Community }],
        where: { uuid: user.uuid },
      });
    },
    getUserDetailsByUuid: (parent: {}, args: { uuid: uuid }) => {
      return models.User.findOne({
        include: [{ model: models.Community }],
        where: { uuid: args.uuid },
      });
    },
    getLoggedInUserCommunities: (parent: {}, args: {}, user: AppUser) => {
      // returns user communities
      return models.Community.findAll({
        include: [
          {
            model: models.User,
            where: { uuid: user.uuid },
          },
        ],
      });
    },
    getUserCommunitiesByUuid: (parent: {}, args: { uuid: uuid }) => {
      // returns public user communities
      return models.Community.findAll({
        include: [
          {
            model: models.User,
            where: { uuid: args.uuid },
          },
        ],
        where: { visibility: COMMUNITY_VISIBILITY_PUBLIC },
      });
    },
    popularCommunities: () => {
      // returns communities with most members
      return models.Community.findAll({
        limit: 10,
        subQuery: false,
        attributes: [
          'uuid',
          'name',
          'tagline',
          'desc',
          'location',
          [sequelize.fn('COUNT', 'CommunityUser.userUuid'), 'userCount'],
        ],
        include: [
          {
            model: models.CommunityUser,
            attributes: [],
          },
        ],
        where: { visibility: COMMUNITY_VISIBILITY_PUBLIC },
        group: ['uuid'],
        order: [[sequelize.literal('"userCount"'), 'DESC']],
      }).map(data => data.toJSON());
    },
    searchCommunities: (parent: {}, args: { query: string }) => {
      const keywords = args.query.split(' ');
      const orQuery = keywords.map((text) => {
        return {
          $iLike: `%${text}%`,
        };
      });
      return models.Community.findAll({
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
      return models.User.findAll({
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
      return models.Community.create({
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
    }) => {
      // check if there is a user with that email
      const user = await models.User.findOne({
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
      mailerClient.sendMail({
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
      const user = await models.User.findOne({
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
      const user = await models.User.findOne({
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
    }, { setCookie }: { setCookie: (string, string, Object) => void }) => {
      // check captcha result before all
      if (!await captchaClient.verifyCaptcha(args.captchaResponse)) {
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
      const exists = await models.User.findOne({
        where: { email: args.email },
      });
      if (exists) {
        throw new ApolloError('This e-mail address is already registered.');
      }

      // all validations passed, create the user
      const passwordHash = md5(args.password);
      const user = await models.User.create({
        uuid: uuid(),
        email: args.email,
        passwordHash,
      });
      const userObj = user.get();

      // Sending async confirmation email
      const { from, templateId } = config.server.emails.signupConfirmation;
      mailerClient.sendMail({
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
    }) => {
      mailerClient.addRecipient(args.email, args.listId);
      return true;
    },
    // CHAT
    sendMessage: async (parent: {}, args: {
      channelUuid: string,
      text: string,
    }, { user }: { user: AppUser }) => {
      // TODO rate-limit
      // TODO sanitize text
      return models.Message.create({
        uuid: uuid(),
        channelUuid: args.channelUuid,
        senderUuid: user.uuid,
        text: args.text.slice(0, 255),
      });
    },
  };

  // Using standard pubsub for chat messages. Here is how the flow works:
  // - user sends a message
  // - new row is created in db
  // - pgsql NOTIFY event is fired
  // - PostgreListener catches it, and publishes an event to pubsub instance
  // - all active listeners (users with websocket connections) will be notified
  const pubsub = new PubSub();
  // eslint-disable-next-line
  new PostgreListener(CHANNELS.CHAT_MESSAGE_NOTIFICATIONS, (payload) => {
    pubsub.publish(CHANNELS.CHAT_MESSAGE_NOTIFICATIONS, payload.data);
  });

  const Subscription = {
    messageSent: {
      resolve: async (payload) => {
        const message = await models.Message.findOne({
          where: { uuid: payload.uuid },
          include: [
            {
              model: models.User, as: 'sender',
            },
          ],
        });
        return message.get();
      },
      // subscribe: () => pubsub.asyncIterator(CHANNELS.CHAT_MESSAGE_NOTIFICATIONS),
      subscribe: withFilter(() => pubsub.asyncIterator(CHANNELS.CHAT_MESSAGE_NOTIFICATIONS), (payload, variables) => {
        return payload.channel_uuid === variables.channelUuid;
      }),
    },
  };

  return {
    Query,
    Mutation,
    Subscription,
  };
};
