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
