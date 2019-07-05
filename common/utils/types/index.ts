import gql from 'graphql-tag'

export default gql`
  extend type Query {
    commentDraft(input: CommentDraftInput!): CommentDraft!
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
`
