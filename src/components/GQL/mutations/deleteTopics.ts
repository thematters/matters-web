import gql from 'graphql-tag'

export default gql`
  mutation DeleteTopics($ids: [ID!]!) {
    deleteTopics(input: { ids: $ids })
  }
`
