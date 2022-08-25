import gql from 'graphql-tag'

import { TagDigest } from '~/components'

export const ALL_TAGS_RECOMMENDED_SIDEBAR = gql`
  query AllTagsRecommendedSidebar {
    viewer @connection(key: "viewerAllTagsRecommendedSidebar") {
      id
      recommendation {
        tags(input: { first: 1 }) {
          edges {
            node {
              id
              recommended(input: { first: 10 }) {
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                    ...TagDigestSidebarTag
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${TagDigest.Sidebar.fragments.tag}
`
