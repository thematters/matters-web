import gql from 'graphql-tag'

import tagFragments from '../fragments/tag'

export default gql`
  query TagFollowers($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        ...FollowersTag
      }
    }
  }
  ${tagFragments.followers}
`
