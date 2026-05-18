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

  type UserFeatures {
    fediverseBeta: Boolean!
    communityWatch: Boolean!
  }

  type ArticleFederationSetting {
    articleId: ID!
    state: FederationArticleSettingState!
    updatedBy: ID
  }

  extend type User {
    federationSetting: UserFederationSetting
    features: UserFeatures!
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
