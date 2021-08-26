import gql from 'graphql-tag'

import { Avatar } from '~/components'

export const fragments = {
  user: gql`
    fragment UserAboutFollowersUser on User {
      id
      followers(input: { first: 20 }) {
        totalCount
        edges {
          cursor
          node {
            id
            ...AvatarUser
          }
        }
      }
    }
    ${Avatar.fragments.user}
  `,
}
