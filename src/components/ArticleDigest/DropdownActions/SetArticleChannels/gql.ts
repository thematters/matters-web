import gql from 'graphql-tag'

export const GET_ARTICLE_CHANNELS = gql`
  query GetArticleChannels($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      id
      oss {
        channels {
          channel {
            id
          }
          enabled
        }
      }
    }
    channels {
      id
      shortHash
      name(input: { language: zh_hant })
      enabled
    }
  }
`

export const SET_ARTICLE_CHANNELS = gql`
  mutation SetArticleChannels($id: ID!, $channels: [ID!]!) {
    setArticleChannels(input: { id: $id, channels: $channels }) {
      id
      oss {
        channels {
          channel {
            id
          }
          enabled
        }
      }
    }
  }
`
