import gql from 'graphql-tag'

import { DraftDigest } from '~/components/DraftDigest'

export const ME_WORKS_DRAFTS_FEED = gql`
  query MeWorksDraftFeed($after: String) {
    viewer {
      id
      drafts(input: { first: 20, after: $after })
        @connection(key: "viewerDrafts") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DraftDigestFeedDraft
          }
        }
      }
    }
  }
  ${DraftDigest.Feed.fragments.draft}
`
