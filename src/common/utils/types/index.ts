import gql from 'graphql-tag'

export default gql`
  extend type Query {
    clientPreference: ClientPreference!
    lastFetchRandom: LastFetchRandom!
  }

  extend type Official {
    gatewayUrls: [String!]
  }

  type ClientPreference {
    id: ID!

    "Login or sign up wall in article detail page"
    wall: Boolean!

    "Whether cicle banner is shown"
    circleBanner: Boolean!

    "Local language setting"
    language: Language
  }

  "To record the last random variable on homepage queries"
  type LastFetchRandom {
    id: ID!
    sidebarTags: Int
    feedTags: Int
    sidebarAuthors: Int
    feedAuthors: Int
  }

  type OnboardingTasks {
    enabled: Boolean!
  }

  enum Language {
    en
    zh_hans
    zh_hant
  }

  # Temporary schema extension for Community Watch development.
  # matters-web CI generates GraphQL types against deployed schemas. Keep this
  # block until the server schema exposing these fields is deployed there.
  extend enum UserFeatureFlagType {
    communityWatch
    fediverseBeta
  }

  extend enum BadgeType {
    carbon_based
    community_watch
  }

  enum FederationAuthorSettingState {
    enabled
    disabled
  }

  enum FederationArticleSettingState {
    inherit
    enabled
    disabled
  }

  type UserFederationSetting {
    userId: ID!
    state: FederationAuthorSettingState!
    updatedBy: ID
  }

  type ArticleFederationSetting {
    articleId: ID!
    state: FederationArticleSettingState!
    updatedBy: ID
  }

  extend type User {
    federationSetting: UserFederationSetting
  }

  extend type Article {
    federationSetting: ArticleFederationSetting
  }

  input SetViewerFederationSettingInput {
    state: FederationAuthorSettingState!
  }

  input SetArticleFederationSettingInput {
    id: ID!
    state: FederationArticleSettingState!
  }

  extend type Mutation {
    setViewerFederationSetting(
      input: SetViewerFederationSettingInput!
    ): UserFederationSetting!

    setArticleFederationSetting(
      input: SetArticleFederationSettingInput!
    ): ArticleFederationSetting!
  }

  extend type Query {
    viewerFediverse: FediverseProfile!
    fediverseArticle(input: FediverseArticleInput!): FediverseArticle!
    fediverseRemoteActor(
      input: FediverseRemoteActorInput!
    ): FediverseRemoteActor!
  }

  extend type Mutation {
    actFediverse(input: FediverseActionInput!): FediverseActionResult!
    refreshFediverseProfile: Boolean!
  }

  type FediverseProfile {
    actorId: String!
    handle: String!
    account: String!
    displayName: String!
    summary: String!
    profileUrl: String!
    avatarUrl: String
    headerUrl: String
    followersCount: Int!
    followingCount: Int!
    pendingFollowingCount: Int!
    unreadNotificationsCount: Int!
    maxFollowing: Int!
    retentionDays: Int!
    timelineMaxItems: Int!
    following: [FediverseRemoteActor!]!
    notifications: [FediverseNotification!]!
    timeline: [FediversePost!]!
  }

  type FediverseRemoteActor {
    actorId: String!
    account: String
    preferredUsername: String
    name: String
    summary: String!
    url: String!
    avatarUrl: String
    status: String
  }

  type FediverseNotification {
    id: ID!
    category: String!
    contentId: String
    objectId: String
    remoteActorIds: [String!]!
    headline: String
    preview: String
    eventCount: Int!
    unreadCount: Int!
    publishedAt: DateTime
  }

  type FediversePost {
    objectId: String!
    content: String!
    summary: String!
    url: String
    inReplyTo: String
    publishedAt: DateTime
    remoteActor: FediverseRemoteActor!
  }

  type FediverseArticle {
    contentId: String
    repliesCount: Int!
    likesCount: Int!
    announcesCount: Int!
    notificationsCount: Int!
    unreadNotificationsCount: Int!
    replies: [FediversePost!]!
  }

  type FediverseActionResult {
    status: String!
    mapping: String
    activityId: String
    remoteActorId: String
  }

  enum FediverseAction {
    follow
    unfollow
    reply
    like
    unlike
    announce
    unannounce
    block
    unblock
    report
    mark_read
  }

  input FediverseArticleInput {
    id: ID!
  }

  input FediverseRemoteActorInput {
    account: String
    actorId: String
  }

  input FediverseActionInput {
    action: FediverseAction!
    account: String
    remoteActorId: String
    objectId: String
    content: String
    activityId: String
    notificationIds: [ID!]
    reason: String
  }

  enum CommunityWatchRemoveCommentReason {
    porn_ad
    spam_ad
  }

  type CommunityWatchAction {
    createdAt: DateTime!
    reason: CommunityWatchRemoveCommentReason!
    uuid: ID!
  }

  input CommunityWatchRemoveCommentInput {
    id: ID!
    reason: CommunityWatchRemoveCommentReason!
  }

  extend type Comment {
    communityWatchAction: CommunityWatchAction
  }

  extend type Mutation {
    communityWatchRemoveComment(
      input: CommunityWatchRemoveCommentInput!
    ): Comment!
  }
`
