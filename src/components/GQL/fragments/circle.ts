import gql from 'graphql-tag'

import { Avatar } from '~/components'

const fragments = {
  followers: gql`
    fragment FollowersCircle on Circle {
      id
      followers(input: { first: 5 }) {
        totalCount
        edges {
          cursor
          node {
            ... on User {
              id
              ...AvatarUser
            }
          }
        }
      }
    }
    ${Avatar.fragments.user}
  `,
}

export default fragments
