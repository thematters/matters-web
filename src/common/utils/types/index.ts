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

  # Temporary schema extension for the Fediverse interaction hardening release.
  # Remove these fields after the matching matters-server schema is deployed.
  extend type Query {
    viewerFediverseUnreadCount: Int!
  }

  extend type FediversePost {
    liked: Boolean!
    announced: Boolean!
    likeActivityId: String
    announceActivityId: String
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
