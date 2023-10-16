import gql from 'graphql-tag'

import { Tag } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import articleFragments from '~/components/GQL/fragments/article'

/**
 * Note:
 *
 * The response of this mutation is aligned with `COLLECTION_LIST` in `CollectionList.tsx`,
 * so that it will auto update the local cache and prevent refetch logics
 */
export const EDIT_ARTICLE = gql`
  mutation EditArticle(
    $id: ID!
    $content: String
    $cover: ID
    $tags: [String!]
    $collection: [ID!]
    $circle: ID
    $accessType: ArticleAccessType
    $license: ArticleLicenseType
    $iscnPublish: Boolean
    $after: String
    $first: first_Int_min_0 = null
    $requestForDonation: requestForDonation_String_maxLength_140
    $replyToDonator: replyToDonator_String_maxLength_140
    $canComment: Boolean
    $sensitive: Boolean
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
        iscnPublish: $iscnPublish
        requestForDonation: $requestForDonation
        replyToDonator: $replyToDonator
        canComment: $canComment
        sensitive: $sensitive
      }
    ) {
      id
      cover
      tags {
        ...DigestTag
      }
      access {
        type
      }
      canComment
      sensitiveByAuthor
      license
      requestForDonation
      replyToDonator
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
