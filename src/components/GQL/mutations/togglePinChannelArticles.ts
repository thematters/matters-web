import gql from 'graphql-tag'

export const TOGGLE_PIN_CHANNEL_ARTICLES = gql`
  mutation togglePinChannelArticles(
    $channels: [ID!]!
    $articles: [ID!]!
    $pinned: Boolean!
  ) {
    togglePinChannelArticles(
      input: { channels: $channels, articles: $articles, pinned: $pinned }
    ) {
      id
      shortHash
    }
  }
`
