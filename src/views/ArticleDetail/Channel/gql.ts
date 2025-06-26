import { gql } from '@apollo/client'

export const fragments = {
  article: {
    public: gql`
      fragment ChannelArticlePublic on Article {
        id
        author {
          id
        }
        classification {
          topicChannel {
            channels {
              enabled
              antiFlooded
              channel {
                id
                nameZhHans: name(input: { language: zh_hans })
                nameZhHant: name(input: { language: zh_hant })
                nameEn: name(input: { language: en })
                shortHash
              }
            }
            feedback {
              id
              state
              type
              channels {
                id
              }
            }
          }
        }
      }
    `,
    private: gql`
      fragment ChannelArticlePrivate on Article {
        id
        classification {
          topicChannel {
            feedback {
              id
              state
              type
              channels {
                id
              }
            }
          }
        }
      }
    `,
  },
}

export const SUBMIT_TOPIC_CHANNEL_FEEDBACK = gql`
  mutation SubmitTopicChannelFeedback(
    $article: ID!
    $type: TopicChannelFeedbackType!
    $channels: [ID!]!
  ) {
    submitTopicChannelFeedback(
      input: { article: $article, type: $type, channels: $channels }
    ) {
      id
      type
      article {
        ...ChannelArticlePublic
        ...ChannelArticlePrivate
      }
    }
  }
  ${fragments.article.public}
  ${fragments.article.private}
`
