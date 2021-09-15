import gql from 'graphql-tag'

export const PUT_TOPIC = gql`
  mutation PutTopic($input: PutTopicInput!) {
    putTopic(input: $input) {
      id
    }
  }
`

export const fragments = gql`
  fragment PutTopicDialogTopic on Topic {
    id
    title
    description
    cover
  }
`
