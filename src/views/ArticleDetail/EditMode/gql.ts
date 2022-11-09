import gql from 'graphql-tag'

import { CircleDigest, Tag } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import articleFragments from '~/components/GQL/fragments/article'
import assetFragment from '~/components/GQL/fragments/asset'

export const EDIT_MODE_ARTICLE = gql`
  query EditModeArticle(
    $mediaHash: String!
    $after: String
    $first: first_Int_min_0 = null
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      slug
      mediaHash
      cover
      assets {
        ...Asset
      }
      tags {
        ...DigestTag
        selected(input: { mediaHash: $mediaHash })
      }
      author {
        id
        ownCircles {
          ...DigestRichCirclePublic
        }
        displayName
        avatar
      }
      access {
        type
        circle {
          id
          ...DigestRichCirclePublic
        }
      }
      license
      requestForDonation
      replyToDonator
      revisionCount
      drafts {
        id
        mediaHash
        publishState
        ...EditorDraft
      }
      ...ArticleCollection
    }
  }
  ${assetFragment}
  ${Tag.fragments.tag}
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

export const EDIT_ARTICLE_SUPPORT_SETTING = gql`
  mutation EditArticleSupportSetting(
    $id: ID!
    $requestForDonation: requestForDonation_String_maxLength_140
    $replyToDonator: replyToDonator_String_maxLength_140
  ) {
    editArticle(
      input: {
        id: $id
        requestForDonation: $requestForDonation
        replyToDonator: $replyToDonator
      }
    ) {
      id
      requestForDonation
      replyToDonator
    }
  }
`
