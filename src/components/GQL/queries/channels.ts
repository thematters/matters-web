import gql from 'graphql-tag'

export const CHANNELS = gql`
  query Channels($userLanguage: UserLanguage!) {
    channels {
      id
      shortHash
      ... on TopicChannel {
        name(input: { language: $userLanguage })
        enabled
      }
    }
  }
`

export const CHANNEL_BY_SHORT_HASH = gql`
  query ChannelByShortHash($shortHash: String!, $userLanguage: UserLanguage!) {
    channel(input: { shortHash: $shortHash }) {
      id
      ... on TopicChannel {
        name(input: { language: $userLanguage })
        note(input: { language: $userLanguage })
      }
    }
  }
`
