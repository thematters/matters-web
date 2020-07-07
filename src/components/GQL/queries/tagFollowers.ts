import gql from 'graphql-tag'

import { Avatar } from '~/components'

export default gql`
  query TagFollowers($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
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
    }
  }
  ${Avatar.fragments.user}
`
