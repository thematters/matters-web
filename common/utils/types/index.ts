import gql from 'graphql-tag'

export default gql`
  extend type Official {
    gatewayUrls: [URL!]
  }
`
