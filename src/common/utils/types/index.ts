import gql from 'graphql-tag'

export default gql`
  extend type Query {
    commentDraft(input: CommentDraftInput!): CommentDraft!
    clientPreference: ClientPreference!
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
    feedSortType: FeedSortType
    readCivicLikerDialog: Boolean!
    wall: Boolean!
    push: Push!
  }

  type Push {
    enabled: Boolean!
    supported: Boolean!
  }

  enum FeedSortType {
    hottest
    newest
  }
`
