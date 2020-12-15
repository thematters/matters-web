import gql from 'graphql-tag'

import { TagDigest } from '~/components/TagDigest'

export const HOTTEST_TAGS = gql`
  query HottestTags($random: NonNegativeInt) {
    viewer @connection(key: "viewerHottestTags") {
      id
      recommendation {
        hottestTags(input: { first: 5, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              id
              ...TagDigestRichTagPublic
              ...TagDigestRichTagPrivate
            }
          }
        }
      }
    }
  }
  ${TagDigest.Rich.fragments.tag.public}
  ${TagDigest.Rich.fragments.tag.private}
`

export const SELECTED_TAGS = gql`
  query SelectedTags($random: NonNegativeInt) {
    viewer @connection(key: "viewerSelectedTags") {
      id
      recommendation {
        selectedTags(input: { first: 5, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              id
              ...TagDigestRichTagPublic
              ...TagDigestRichTagPrivate
            }
          }
        }
      }
    }
  }
  ${TagDigest.Rich.fragments.tag.public}
  ${TagDigest.Rich.fragments.tag.private}
`
