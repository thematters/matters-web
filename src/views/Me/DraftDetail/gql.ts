import gql from 'graphql-tag'

import { ArticleDigestDropdown, CircleDigest } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import SelectCampaign from '~/components/Editor/SelectCampaign'
import assetFragment from '~/components/GQL/fragments/asset'

import PublishState from './PublishState'

/**
 * Fragment for data contain draft cover, tags, collection & support feedback
 */
export const editMetaFragment = gql`
  fragment EditMetaDraft on Draft {
    id
    publishState
    createdAt
    updatedAt
    cover
    assets {
      ...Asset
    }
    tags
    collections(input: { first: null }) {
      edges {
        node {
          id
          articles(input: { first: 0 }) {
            totalCount
          }
        }
      }
    }
    connections(input: { first: null }) {
      edges {
        node {
          ...ArticleDigestDropdownArticle
        }
      }
    }
    access {
      type
      circle {
        ...DigestRichCirclePublic
      }
    }
    campaigns {
      campaign {
        id
      }
      stage {
        id
      }
    }
    license
    requestForDonation
    replyToDonator
    sensitiveByAuthor
    iscnPublish
    canComment
    indentFirstLine
  }
  ${ArticleDigestDropdown.fragments.article}
  ${assetFragment}
  ${CircleDigest.Rich.fragments.circle.public}
`

/**
 * Fetch draft detail or assets only
 */
export const DRAFT_DETAIL_VIEWER = gql`
  query DraftDetailViewerQuery {
    viewer {
      id
      campaigns(input: { first: null }) {
        edges {
          node {
            id
            ...EditorSelectCampaign
          }
        }
      }
      ownCircles {
        ...DigestRichCirclePublic
      }
      displayName
      avatar
      collections(input: { first: null }) {
        edges {
          node {
            id
            title
            articles(input: { first: 0 }) {
              totalCount
            }
          }
        }
      }
    }
  }
  ${CircleDigest.Rich.fragments.circle.public}
  ${SelectCampaign.fragments}
`

export const DRAFT_DETAIL = gql`
  query DraftDetailQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        ...EditorDraft
        ...PublishStateDraft
        ...EditMetaDraft
      }
    }
  }
  ${EditorFragments.draft}
  ${PublishState.fragments.draft}
  ${editMetaFragment}
`

export const DRAFT_ASSETS = gql`
  query DraftAssets($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        assets {
          ...Asset
        }
      }
    }
  }
  ${assetFragment}
`

/**
 * Editing draft content, cover, tags & collection
 */
export const SET_CONTENT = gql`
  mutation SetDraftContent(
    $id: ID!
    $title: String
    $content: String
    $summary: String
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        title: $title
        content: $content
        summary: $summary
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      title
      content
      cover
      updatedAt
      assets {
        ...Asset
      }
      summary
      summaryCustomized
    }
  }
  ${assetFragment}
`

export const SET_CONNECTIONS = gql`
  mutation SetDraftConnections(
    $id: ID!
    $connections: [ID!]
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        connections: $connections
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_COLLECTIONS = gql`
  mutation SetDraftCollections(
    $id: ID!
    $collections: [ID!]
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        collections: $collections
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_COVER = gql`
  mutation SetDraftCover($id: ID!, $cover: ID, $lastUpdatedAt: DateTime) {
    putDraft(input: { id: $id, cover: $cover, lastUpdatedAt: $lastUpdatedAt }) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_TAGS = gql`
  mutation SetDraftTags($id: ID!, $tags: [String!]!, $lastUpdatedAt: DateTime) {
    putDraft(input: { id: $id, tags: $tags, lastUpdatedAt: $lastUpdatedAt }) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_SUPPORT_REQUEST_REPLY = gql`
  mutation SetSupportRequestReply(
    $id: ID!
    $requestForDonation: requestForDonation_String_maxLength_140
    $replyToDonator: replyToDonator_String_maxLength_140
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        requestForDonation: $requestForDonation
        replyToDonator: $replyToDonator
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_SENSITIVE_BY_AUTHOR = gql`
  mutation SetDraftSensitiveByAuthor(
    $id: ID!
    $sensitiveByAuthor: Boolean
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        sensitive: $sensitiveByAuthor
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_PUBLISH_ISCN = gql`
  mutation SetDraftPublishISCN(
    $id: ID!
    $iscnPublish: Boolean
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        iscnPublish: $iscnPublish
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_CAN_COMMENT = gql`
  mutation SetDraftCanComment(
    $id: ID!
    $canComment: Boolean
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: { id: $id, canComment: $canComment, lastUpdatedAt: $lastUpdatedAt }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_INDENT = gql`
  mutation SetDraftIndent(
    $id: ID!
    $indented: Boolean
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        indentFirstLine: $indented
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_ACCESS = gql`
  mutation SetDraftAccess(
    $id: ID!
    $circle: ID
    $accessType: ArticleAccessType
    $license: ArticleLicenseType
    $lastUpdatedAt: DateTime
  ) {
    putDraft(
      input: {
        id: $id
        circle: $circle
        accessType: $accessType
        license: $license
        lastUpdatedAt: $lastUpdatedAt
      }
    ) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_CAMPAIGN = gql`
  mutation SetDraftCampaign(
    $id: ID!
    $campaigns: [ArticleCampaignInput!]
    $isReset: Boolean!
    $lastUpdatedAt: DateTime
  ) {
    setDraftCampaign: putDraft(
      input: { id: $id, campaigns: $campaigns, lastUpdatedAt: $lastUpdatedAt }
    ) @skip(if: $isReset) {
      id
      ...EditMetaDraft
    }
    resetDraftCampaign: putDraft(
      input: { id: $id, campaigns: [], lastUpdatedAt: $lastUpdatedAt }
    ) @include(if: $isReset) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`
