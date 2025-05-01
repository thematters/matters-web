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

      ... on CurationChannel {
        name(input: { language: $userLanguage })
      }

      ... on WritingChallenge {
        name(input: { language: $userLanguage })
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

      ... on CurationChannel {
        name(input: { language: $userLanguage })
        note(input: { language: $userLanguage })
      }

      ... on WritingChallenge {
        name(input: { language: $userLanguage })
        note(input: { language: $userLanguage })
      }
    }
  }
`
