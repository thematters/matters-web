import gql from 'graphql-tag'

import { ArticleDetailComments } from '../fragments/article'

export default gql`
  query ArticleComments(
    $mediaHash: String
    $uuid: UUID
    $cursor: String
    $first: Int = 10
    $hasDescendantComments: Boolean = true
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      mediaHash
      live
      ...ArticleDetailComments
    }
  }
  ${ArticleDetailComments}
`
