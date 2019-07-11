import gql from 'graphql-tag'

export default gql`
  extend type Query {
    commentDraft(input: CommentDraftInput!): CommentDraft!
    clientPreference(input: ClientPreferenceInput!): ClientPreference!
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
  }

  input ClientPreferenceInput {
    id: ID!
  }

  enum FeedSortType {
    hottest
    newest
  }
`
