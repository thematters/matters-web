import gql from 'graphql-tag'

import { ArticleDetailComments } from '../fragments/article'

export default gql`
  query ArticleComments(
    $mediaHash: String
    $cursor: String
    $first: Int = 10
    $hasDescendantComments: Boolean = true
    $before: String
    $includeAfter: Boolean
    $includeBefore: Boolean
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      mediaHash
      live
      ...ArticleDetailComments
    }
  }
  ${ArticleDetailComments}
`
