import gql from 'graphql-tag'

import { TagDigest } from '~/components'

export const ALL_TAGS_HOTTEST_PUBLIC = gql`
  query AllTagsHottestPublic($after: String) {
    viewer {
      id
      recommendation {
        tags(input: { first: 30, after: $after }) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              ...TagDigestFeedTag
            }
          }
        }
      }
    }
  }
  ${TagDigest.Feed.fragments.tag}
`
