import gql from 'graphql-tag'

export default gql`
  extend type Query {
    commentDraft(input: CommentDraftInput!): CommentDraft!
    clientPreference: ClientPreference!
    clientInfo: ClientInfo!
    lastFetchRandom: LastFetchRandom!
  }

  extend type Official {
    gatewayUrls: [String!]
  }

  type CommentDraft {
    id: ID!
    content: String!
  }

  input CommentDraftInput {
    id: ID!
  }

  type ClientPreference {
    id: ID!

    "Feed type in homepage"
    feedSortType: FeedSortType

    "Whether civic liker dialog is hidden"
    readCivicLikerDialog: Boolean!

    "Login or sign up wall in article detail page"
    wall: Boolean!

    "Whether push notification is supported/enabled"
    push: Push!

    "Log route history for page back button"
    routeHistory: [String!]

    onboardingTasks: OnboardingTasks!

    "Whether cicle banner is shown"
    circleBanner: Boolean!

    "Local language setting"
    language: Language
  }

  type ClientInfo {
    id: ID!
    viewportSize: ViewportSize!
  }

  "To record the last random variable on homepage queries"
  type LastFetchRandom {
    id: ID!
    sidebarTags: Int
    feedTags: Int
    sidebarAuthors: Int
    feedAuthors: Int
  }

  type Push {
    enabled: Boolean!
    supported: Boolean!
  }

  type ViewportSize {
    width: Int
    height: Int
  }

  type OnboardingTasks {
    enabled: Boolean!
  }

  enum FeedSortType {
    hottest
    newest
  }

  enum FollowFeedType {
    article
    comment
    tag
    donation
  }

  enum Language {
    en
    zh_hans
    zh_hant
  }
`
