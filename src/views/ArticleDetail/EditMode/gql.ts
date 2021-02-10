import gql from 'graphql-tag'

import { CircleDigest } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
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
      slug
      assets {
        ...Asset
      }
      author {
        id
        ownCircles {
          ...DigestRichCirclePublic
        }
      }
      drafts {
        mediaHash
        publishState
        ...EditorDraft
      }
      ...ArticleCollection
    }
  }
  ${assetFragment}
  ${articleFragments.articleCollection}
  ${EditorFragments.draft}
  ${CircleDigest.Rich.fragments.circle.public}
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
