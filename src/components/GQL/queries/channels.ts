import gql from 'graphql-tag'

export const CHANNELS = gql`
  query Channels($userLanguage: UserLanguage!) {
    channels {
      id
      shortHash
      name(input: { language: $userLanguage })
    }
  }
`

export const CHANNEL_BY_SHORT_HASH = gql`
  query ChannelByShortHash($shortHash: String!, $userLanguage: UserLanguage!) {
    channel(input: { shortHash: $shortHash }) {
      id
      name(input: { language: $userLanguage })
      description(input: { language: $userLanguage })
    }
  }
`
