import gql from 'graphql-tag'

import articleFragments from '~/components/GQL/fragments/article'
import { ArticleTag } from '~/components/Tag'

const fragment = gql`
  fragment ArticleDetailEditHeaderArticle on Article {
    id
    cover
    tags {
      ...DigestTag
    }
    access {
      circle {
        id
      }
      type
    }
    canComment
    indentFirstLine
    sensitiveByAuthor
    license
    requestForDonation
    replyToDonator
    campaigns {
      campaign {
        id
      }
      stage {
        id
      }
    }
    ...ArticleConnections
  }
  ${ArticleTag.fragments.tag}
  ${articleFragments.articleConnections}
`

export const EDIT_ARTICLE = gql`
  mutation EditArticle(
    $id: ID!
    $description: description_String_maxLength_140
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
    $indented: Boolean
    $sensitive: Boolean
    $campaigns: [ArticleCampaignInput!]
    $isResetCampaign: Boolean! = false
  ) {
    editArticle(
      input: {
        id: $id
        description: $description
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
        indentFirstLine: $indented
        sensitive: $sensitive
        campaigns: $campaigns
      }
    ) @skip(if: $isResetCampaign) {
      id
      ...ArticleDetailEditHeaderArticle
    }
    editArticleResetCampaign: editArticle(
      input: {
        id: $id
        description: $description
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
        indentFirstLine: $indented
        sensitive: $sensitive
        campaigns: []
      }
    ) @include(if: $isResetCampaign) {
      id
      ...ArticleDetailEditHeaderArticle
    }
  }
  ${fragment}
`
