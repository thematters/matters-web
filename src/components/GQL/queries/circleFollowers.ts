import gql from 'graphql-tag'

import circleFragments from '../fragments/circle'

export default gql`
  query CircleFollowers($id: ID!) {
    node(input: { id: $id }) {
      ... on Circle {
        id
        ...FollowersCircle
      }
    }
  }
  ${circleFragments.followers}
`
