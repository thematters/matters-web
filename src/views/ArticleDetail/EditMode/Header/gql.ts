import gql from 'graphql-tag'

import { Tag } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import articleFragments from '~/components/GQL/fragments/article'
import assetFragment from '~/components/GQL/fragments/asset'

/**
 * Note:
 *
 * The response of this mutation is aligned with `COLLECTION_LIST` in `CollectionList.tsx`,
 * so that it will auto update the local cache and prevent refetch logics
 */
export const EDIT_ARTICLE = gql`
  mutation EditArticle(
    $id: ID!
    $mediaHash: String!
    $content: String
    $cover: ID
    $tags: [String!]
    $collection: [ID!]
    $circle: ID
    $accessType: ArticleAccessType
    $license: ArticleLicenseType
    $after: String
    $first: Int = null
  ) {
    editArticle(
      input: {
        id: $id
        content: $content
        cover: $cover
        tags: $tags
        collection: $collection
        circle: $circle
        accessType: $accessType
        license: $license
      }
    ) {
      id
      cover
      tags {
        ...DigestTag
        selected(input: { mediaHash: $mediaHash })
      }
      access {
        type
      }
      license
      drafts {
        id
        mediaHash
        publishState
        ...EditorDraft
      }
      ...ArticleCollection
    }
  }
  ${Tag.fragments.tag}
  ${articleFragments.articleCollection}
  ${EditorFragments.draft}
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
