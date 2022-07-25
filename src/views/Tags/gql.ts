import gql from 'graphql-tag'

import { TagDigest } from '~/components'

export const ALL_TAGS_RECOMMENDED = gql`
  query AllTagsRecommended($after: String) {
    viewer @connection(key: "viewerAllTagsRecommended") {
      id
      recommendation {
        tags(input: { first: 1 }) {
          edges {
            node {
              id
              recommended(input: { first: 20, after: $after }) {
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
      }
    }
  }
  ${TagDigest.Feed.fragments.tag}
`

export const ALL_TAGS_HOTTEST = gql`
  query AllTagsHottest($after: String) {
    viewer @connection(key: "viewerAllTagsHottest") {
      id
      recommendation {
        tags(input: { first: 2 }) {
          edges {
            node {
              id
              recommended(input: { first: 20, after: $after }) {
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
      }
    }
  }
  ${TagDigest.Feed.fragments.tag}
`
