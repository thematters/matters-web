import gql from 'graphql-tag'

export const GET_ARTICLE_TOPIC_CHANNELS = gql`
  query GetArticleTopicChannels($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      id
      oss {
        topicChannels {
          channel {
            id
          }
          enabled
          pinned
        }
      }
    }
    channels {
      id
      shortHash
      ... on TopicChannel {
        name(input: { language: zh_hant })
        enabled
      }
    }
  }
`

export const SET_ARTICLE_TOPIC_CHANNELS = gql`
  mutation SetArticleTopicChannels($id: ID!, $channels: [ID!]!) {
    setArticleTopicChannels(input: { id: $id, channels: $channels }) {
      id
      oss {
        topicChannels {
          channel {
            id
          }
          enabled
          pinned
        }
      }
    }
  }
`
