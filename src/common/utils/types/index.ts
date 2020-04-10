import gql from 'graphql-tag';

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
    feedSortType: FeedSortType
    viewMode: ViewMode
    readCivicLikerDialog: Boolean!
    wall: Boolean!
    push: Push!
    routeHistory: [URL!]
  }

  type ClientInfo {
    id: ID!
    viewportSize: ViewportSize!
    isPhone: Boolean!
    isTablet: Boolean!
    isMobile: Boolean!
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

  enum ViewMode {
    default
    comfortable
    compact
  }
`;
