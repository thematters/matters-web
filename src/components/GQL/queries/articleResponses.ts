import gql from 'graphql-tag'

import { ArticleDetailResponses } from '../fragments/response'

export default gql`
  query ArticleResponses(
    $mediaHash: String
    $before: String
    $after: String
    $first: Int = 8
    $includeAfter: Boolean
    $includeBefore: Boolean
    $hasDescendants: Boolean = true
    $articleOnly: Boolean
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      mediaHash
      live
      ...ArticleDetailResponses
    }
  }
  ${ArticleDetailResponses}
`
