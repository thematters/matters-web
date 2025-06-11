import { gql } from '@apollo/client'

export const fragments = {
  article: gql`
    fragment ChannelArticle on Article {
      id
      author {
        id
      }
      classification {
        topicChannel {
          channels {
            channel {
              id
              nameZhHans: name(input: { language: zh_hans })
              nameZhHant: name(input: { language: zh_hant })
              nameEn: name(input: { language: en })
            }
          }
          feedback {
            id
            type
          }
        }
      }
    }
  `,
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
        ...ChannelArticle
      }
    }
  }
  ${fragments.article}
`
