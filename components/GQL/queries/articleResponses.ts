import gql from 'graphql-tag'

import { ArticleDetailResponses } from '../fragments/response'

export default gql`
  query ArticleResponses(
    $mediaHash: String
    $uuid: UUID
    $before: String
    $cursor: String
    $first: Int = 10
    $includeAfter: Boolean
    $includeBefore: Boolean
    $hasDescendantComments: Boolean = true
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
    $articleOnly: Boolean
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      mediaHash
      live
      ...ArticleDetailResponses
    }
  }
  ${ArticleDetailResponses}
`
