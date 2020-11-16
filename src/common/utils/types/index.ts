import gql from 'graphql-tag'

export default gql`
  extend type Query {
    commentDraft(input: CommentDraftInput!): CommentDraft!
    clientPreference: ClientPreference!
    clientInfo: ClientInfo!
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

    "Whether onboarding tasks tracker is shown"
    onboardingTasks: Boolean!
  }

  type ClientInfo {
    id: ID!
    viewportSize: ViewportSize!
  }

  type Push {
    enabled: Boolean!
    supported: Boolean!
  }

  type ViewportSize {
    width: Int
    height: Int
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
