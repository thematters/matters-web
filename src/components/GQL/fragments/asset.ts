import { gql } from '@apollo/client'

export default gql`
  fragment Asset on Asset {
    id
    type
    path
  }
`
