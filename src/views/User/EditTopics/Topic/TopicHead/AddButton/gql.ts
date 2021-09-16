import gql from 'graphql-tag'

export const ADD_TOPIC_ARTICLES = gql`
  mutation AddTopicArticles($input: PutTopicInput!) {
    putTopic(input: $input) {
      id
    }
  }
`

export const fragments = gql`
  fragment AddButtonTopic on Topic {
    id
    articles {
      id
    }
    chapters {
      id
    }
  }
`
