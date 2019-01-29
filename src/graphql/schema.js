import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

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

  enum EventLocationType {
    unplanned
    online
    address
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
    reputation: Int
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
    senderUuid: String
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
    getChannels(communityUuid: String!): [Channel]
    getMessagesForChannel(channelUuid: String!, cursor: Int): ChannelMessages

    getCommunityEvents(communityUuid: ID!, limit: Int): [Event]
    getCommunityMembers(uuid: ID!): Community
    getCommunityMostActiveMembers(communityUuid: ID!): [UserDetails]
    getLoggedInUserDetails: LoggedInUserDetails
    popularCommunities: [PopularCommunity]

    getUserDetailsByUuid(uuid: ID!): UserDetails
    getUserEvents(userUuid: ID!): [Event]
    getUserCommunitiesByUuid(uuid: ID!): [Community]
    getLoggedInUserCommunities: [Community]

    searchCommunities(query: String!): [Community]
    searchUsers(query:String!): [UserDetails]
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
      channelUuid: String
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
    messageSent(channelUuid: String!): Message
  }
`;
