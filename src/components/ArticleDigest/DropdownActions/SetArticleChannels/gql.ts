import gql from 'graphql-tag'

export const GET_ARTICLE_TOPIC_CHANNELS = gql`
  query GetArticleTopicChannels($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      id
      classification {
        topicChannel {
          enabled
          channels {
            channel {
              id
            }
            enabled
            pinned
          }
        }
      }
    }
    channels(input: { oss: true }) {
      id
      shortHash
      ... on TopicChannel {
        name(input: { language: zh_hant })
        providerId
        parent {
          id
          name(input: { language: zh_hant })
        }
      }
    }
  }
`

export const SET_ARTICLE_TOPIC_CHANNELS = gql`
  mutation SetArticleTopicChannels($id: ID!, $channels: [ID!]!) {
    setArticleTopicChannels(input: { id: $id, channels: $channels }) {
      id
      classification {
        topicChannel {
          enabled
          channels {
            channel {
              id
            }
            enabled
            pinned
          }
        }
      }
    }
  }
`
