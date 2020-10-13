import gql from 'graphql-tag'

export default gql`
  fragment Asset on Asset {
    id
    type
    path
  }
`
