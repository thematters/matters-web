import gql from 'graphql-tag'

// TODO: Why this line don't work
// import { TagDigest, UserDigest } from '~/components'
import { TagDigest } from '~/components/TagDigest'
import { UserDigest } from '~/components/UserDigest'

export const QUICK_RESULT = gql`
  query QuickResult($key: String!, $version: SearchAPIVersion = v20221212) {
    user: search(
      input: {
        type: User
        quicksearch: true
        version: $version
        first: 5
        key: $key
      }
    ) {
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestConciseUser
          }
        }
      }
    }
    tag: search(
      input: {
        type: Tag
        quicksearch: true
        version: $version
        first: 5
        key: $key
      }
    ) {
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
