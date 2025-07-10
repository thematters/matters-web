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

export const BATCH_PIN_UNPIN_CHANNEL_ARTICLES = gql`
  mutation batchPinUnpinChannelArticles(
    $pinChannels: [ID!]!
    $unpinChannels: [ID!]!
    $articles: [ID!]!
  ) {
    pinChannelArticles: togglePinChannelArticles(
      input: { channels: $pinChannels, articles: $articles, pinned: true }
    ) {
      id
      shortHash
    }
    unpinChannelArticles: togglePinChannelArticles(
      input: { channels: $unpinChannels, articles: $articles, pinned: false }
    ) {
      id
      shortHash
    }
  }
`
