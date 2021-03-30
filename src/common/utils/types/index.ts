import gql from 'graphql-tag'

export default gql`
  extend type Query {
    commentDraft(input: CommentDraftInput!): CommentDraft!
    clientPreference: ClientPreference!
    clientInfo: ClientInfo!
    fetchRecord: FetchRecord!
  }

  extend type Official {
    gatewayUrls: [URL!]
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

    "Feed type in follow page"
    followFeedType: FollowFeedType

    "View Mode for entity's card UI"
    viewMode: ViewMode

    "Whether civic liker dialog is hidden"
    readCivicLikerDialog: Boolean!

    "Login or sign up wall in article detail page"
    wall: Boolean!

    "Whether push notification is supported/enabled"
    push: Push!

    "Log route history for page back button"
    routeHistory: [URL!]

    onboardingTasks: OnboardingTasks!

    "Whether cicle banner is shown"
    circleBanner: Boolean!
  }

  type ClientInfo {
    id: ID!
    viewportSize: ViewportSize!
  }

  type FetchRecord {
    id: ID!
    sidebarTags: Boolean!
    feedTags: Boolean!
    sidebarAuthors: Boolean!
    feedAuthors: Boolean!
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

  enum ViewMode {
    default
    comfortable
    compact
  }
`
