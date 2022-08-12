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

    "Whether civic liker dialog is hidden"
    readCivicLikerDialog: Boolean!

    "Login or sign up wall in article detail page"
    wall: Boolean!

    "Log route history for page back button"
    routeHistory: [String!]

    onboardingTasks: OnboardingTasks!

    "Whether cicle banner is shown"
    circleBanner: Boolean!

    "Whether announcement is shown"
    announcement: Int

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

  type ViewportSize {
    width: Int
    height: Int
  }

  type OnboardingTasks {
    enabled: Boolean!
  }

  enum Language {
    en
    zh_hans
    zh_hant
  }
`
