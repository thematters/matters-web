import gql from 'graphql-tag'

import { CircleDigest, Tag } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import articleFragments from '~/components/GQL/fragments/article'
import assetFragment from '~/components/GQL/fragments/asset'

export const EDIT_MODE_ARTICLE = gql`
  query EditModeArticle(
    $id: ID!
    $after: String
    $first: first_Int_min_0 = null
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        slug
        mediaHash
        cover
        assets {
          ...Asset
        }
        tags {
          ...DigestTag
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
        sensitiveByAuthor
        requestForDonation
        replyToDonator
        revisionCount
        drafts {
          id
          mediaHash
          publishState
          ...EditorDraft
        }
        newestPublishedDraft {
          id
          mediaHash
          tags
          publishState
          ...EditorDraft
        }
        ...ArticleCollection
      }
    }
  }
  ${assetFragment}
  ${Tag.fragments.tag}
  ${articleFragments.articleCollection}
  ${EditorFragments.draft}
  ${CircleDigest.Rich.fragments.circle.public}
`

export const EDIT_MODE_ARTICLE_ASSETS = gql`
  query EditModeArticleAssets($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        assets {
          ...Asset
        }
      }
    }
  }
  ${assetFragment}
`
