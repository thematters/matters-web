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
`
