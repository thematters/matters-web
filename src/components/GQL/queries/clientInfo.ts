import { gql } from '@apollo/client'

export default gql`
  query ClientInfo {
    clientInfo @client {
      id
      viewportSize {
        width
        height
      }
    }
  }
`
