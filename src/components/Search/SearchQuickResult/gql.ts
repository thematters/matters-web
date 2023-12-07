import gql from 'graphql-tag'

import { TagDigest } from '~/components/TagDigest'
import { UserDigest } from '~/components/UserDigest'

export const QUICK_RESULT = gql`
  query QuickResult($key: String!, $version: SearchAPIVersion = v20230601) {
    user: search(
      input: {
        type: User
        quicksearch: true
        record: true
        first: 5
        key: $key
        version: $version
      }
    ) {
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestRichUserPublic
          }
        }
      }
    }
    tag: search(
      input: {
        type: Tag
        quicksearch: true
        record: true
        first: 5
        key: $key
        version: $version
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
  ${UserDigest.Rich.fragments.user.public}
  ${TagDigest.Concise.fragments.tag}
`
