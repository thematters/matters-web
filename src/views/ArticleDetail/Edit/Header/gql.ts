import gql from 'graphql-tag'

import { Tag } from '~/components'
import articleFragments from '~/components/GQL/fragments/article'

export const EDIT_ARTICLE = gql`
  mutation EditArticle(
    $id: ID!
    $title: String
    $summary: String
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
        title: $title
        summary: $summary
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
      ...ArticleCollection
    }
  }
  ${Tag.fragments.tag}
  ${articleFragments.articleCollection}
`
