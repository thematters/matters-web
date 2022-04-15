import gql from 'graphql-tag'

import { ArticleDigestDropdown, CircleDigest } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import assetFragment from '~/components/GQL/fragments/asset'

import PublishState from './PublishState'

/**
 * Fragment for data contain draft cover, tags & collection
 */
export const editMetaFragment = gql`
  fragment EditMetaDraft on Draft {
    id
    publishState
    cover
    assets {
      ...Asset
    }
    tags
    collection(input: { first: null }) {
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
    license
  }
  ${ArticleDigestDropdown.fragments.article}
  ${assetFragment}
  ${CircleDigest.Rich.fragments.circle.public}
`

/**
 * Fetch draft detail or assets only
 */
export const DRAFT_DETAIL = gql`
  query DraftDetailQuery($id: ID!) {
    viewer {
      id
      ownCircles {
        ...DigestRichCirclePublic
      }
    }
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
  ) {
    putDraft(
      input: { id: $id, title: $title, content: $content, summary: $summary }
    ) {
      id
      title
      content
      cover
      assets {
        ...Asset
      }
      summary
      summaryCustomized
    }
  }
  ${assetFragment}
`

export const SET_COLLECTION = gql`
  mutation SetDraftCollection($id: ID!, $collection: [ID]) {
    putDraft(input: { id: $id, collection: $collection }) {
      id
      collection(input: { first: null }) {
        edges {
          node {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`

export const SET_COVER = gql`
  mutation SetDraftCover($id: ID!, $cover: ID) {
    putDraft(input: { id: $id, cover: $cover }) {
      id
      ...EditMetaDraft
    }
  }
  ${editMetaFragment}
`

export const SET_TAGS = gql`
  mutation SetDraftTags($id: ID!, $tags: [String!]!) {
    putDraft(input: { id: $id, tags: $tags }) {
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
  ) {
    putDraft(
      input: {
        id: $id
        circle: $circle
        accessType: $accessType
        license: $license
      }
    ) {
      id
      access {
        type
        circle {
          ...DigestRichCirclePublic
        }
      }
      license
    }
  }
  ${CircleDigest.Rich.fragments.circle.public}
`
