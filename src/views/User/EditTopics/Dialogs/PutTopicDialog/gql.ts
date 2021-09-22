import gql from 'graphql-tag'

export const PUT_TOPIC = gql`
  mutation PutTopic($input: PutTopicInput!) {
    putTopic(input: $input) {
      id
      title
      description
      cover
    }
  }
`

export const fragments = {
  topic: gql`
    fragment PutTopicDialogTopic on Topic {
      id
      title
      description
      cover
    }
  `,
}
