import gql from 'graphql-tag'

import { TagDigest } from '~/components'

export const ALL_TAGS_HOTTEST = gql`
  query AllTagsHottest($after: String) {
    viewer @connection(key: "viewerAllTagsHottest") {
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

export const TAG_REACTIVE_DATA = gql`
  query TagReactiveData($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Tag {
        numArticles
      }
    }
  }
`
