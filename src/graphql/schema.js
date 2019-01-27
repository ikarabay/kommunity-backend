import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  enum EventLocationType {
    unplanned
    online
    address
  }

  enum CommunityTier {
    free
    tier1
    tier2
    tier3
  }

  enum CommunityType {
    public
    private
    secret
  }

  enum ConversationCategoryType {
    public
    private
    secret
  }

  enum ConversationCategoryRole {
    guest
    member
    moderator
    admin
  }

  enum UploadedItemType {
    user_avatar
    community_avatar
    post_attachment
  }

  type Event {
    uuid: ID!
    communityUuid: ID!
    imageUuid: ID
    title: String
    content: String
    timeStart: Date
    timeEnd: Date
    timezone: String
    location: EventLocationType
    venueName: String
    address1: String
    address2: String
    city: String
    state: String
    zip: Int
    country: String
    latitude: Float
    longitude: Float

    UserEvent: UserEvent
  }

  type UserEvent {
    role: String
  }

  type LoggedInUserDetails {
    uuid: ID!
    email: String!
    username: String
    firstName: String
    lastName: String
    userAttributes: String
    location: String
    avatarUploadUuid: ID
    lastSeenAt: Date
  }

  type UserDetails {
    uuid: ID!
    email: String
    firstName: String
    lastName: String
    username: String
    location: String
    avatarUploadUuid: ID
    lastSeenAt: Date
    CommunityUser: CommunityUser
  }

  type Community {
    uuid: String
    name: String
    tagline: String
    desc: String
    location: String
    tier: CommunityTier
    visibility: CommunityType
    users: [UserDetails]
  }

  type CommunityUser {
    communityUuid: String
    userUuid: String
    status: String
    role: String
  }

  type PopularCommunity {
    uuid: String
    name: String
    tagline: String
    desc: String
    location: String
    userCount: Int
  }

  type Message {
    channelUuid: String
    uuid: String
    sender: UserDetails
    text: String
    createdAt: Date
  }

  type Channel {
    communityUuid: String
    uuid: String
    name: String
    desc: String
  }

  type ChannelMessages {
    nextCursor: Int
    messages: [Message]
  }

  type Query {
    getChannels(communityUUID: String!): [Channel]
    getMessagesForChannel(channelUUID: String!, cursor: Int): ChannelMessages
    getCommunityEvents(communityUuid: ID!): [Event]
    getCommunityMembers(uuid: ID!): Community
    getLoggedInUserDetails: LoggedInUserDetails
    getUserDetailsByUuid(uuid: ID!): UserDetails
    getUserEvents(userUuid: ID!): [Event]
    getLoggedInUserCommunities: [Community]
    getUserCommunitiesByUuid(uuid: ID!): [Community]
    searchCommunities(query: String!): [Community]
    searchUsers(query:String!): [UserDetails]
    popularCommunities: [PopularCommunity]
  }

  type Mutation {
    createCommunity(
      name: String
      tagline: String
      desc: String
      location: String
      tier: CommunityTier
      visibility: CommunityType
    ): Community
    sendMessage(
      channelUUID: String
      senderUUID: String,
      text: String,
    ): Message

    forgotPassword(email: String!): Boolean
    resetPassword(newPassword: String!, token: String!): Boolean
    login(email: String!, password: String!): Boolean
    logout: Boolean
    signup(
      email: String!,
      password: String!,
      captchaResponse: String!
    ): Boolean

    subscribeToMailList(email: String!, listId: String!): Boolean
  }

  type Subscription {
    messageSent(channelUUID: String!): Message
  }
`;
