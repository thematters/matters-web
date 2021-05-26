import gql from 'graphql-tag'

import { CircleDigest, Tag } from '~/components'
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
      }
      access {
        type
        circle {
          id
          ...DigestRichCirclePublic
        }
      }
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
