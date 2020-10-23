import gql from 'graphql-tag'

import articleFragments from '~/components/GQL/fragments/article'
import assetFragment from '~/components/GQL/fragments/asset'

export const EDIT_MODE_ARTICLE = gql`
  query EditModeArticle(
    $mediaHash: String!
    $after: String
    $first: Int = null
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      cover
      assets {
        ...Asset
      }
      ...ArticleCollection
    }
  }
  ${assetFragment}
  ${articleFragments.articleCollection}
`

export const EDIT_MODE_ARTICLE_ASSETS = gql`
  query EditModeArticleAssets($mediaHash: String!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      assets {
        ...Asset
      }
    }
  }
  ${assetFragment}
`
