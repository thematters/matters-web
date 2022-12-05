import gql from 'graphql-tag'

// TODO: Why this line don't work
// import { TagDigest, UserDigest } from '~/components'

import { TagDigest } from '~/components/TagDigest'
import { UserDigest } from '~/components/UserDigest'

export const QUICK_RESULT = gql`
  query QuickResult($key: String!) {
    user: search(input: { key: $key, type: User, first: 5 }) {
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestConciseUser
          }
        }
      }
    }
    tag: search(input: { key: $key, type: Tag, first: 5 }) {
      edges {
        cursor
        node {
          ... on Tag {
            ...TagDigestConciseTag
          }
        }
      }
    }
  }
  ${UserDigest.Concise.fragments.user}
  ${TagDigest.Concise.fragments.tag}
`
