import gql from 'graphql-tag'

import MetaInfo from '../MetaInfo'
import { fragments as circleWallFragments } from '../Wall/Circle/gql'
import InfoHeader from './InfoHeader'
import Versions from './Versions'

const articleHistoryPublicFragment = gql`
  fragment ArticleHistoryPublicArticle on Article {
    id
    slug
    mediaHash
    state
    cover
    summaryCustomized
    language
    author {
      id
    }
    access {
      type
      circle {
        id
        ...CircleWallCirclePublic
        ...CircleWallCirclePrivate
      }
    }
    license
    sensitiveByAuthor
    sensitiveByAdmin
    requestForDonation
    replyToDonator
    availableTranslations
    ...InfoHeaderArticle
    ...VersionsArticle
    ...MetaInfoArticle
  }
  ${circleWallFragments.circle.public}
  ${circleWallFragments.circle.private}
  ${InfoHeader.fragments.article}
  ${Versions.fragments.article}
  ${MetaInfo.fragments.article}
`

const articleVersionFragment = gql`
  fragment ArticleVersion on ArticleVersion {
    id
    title
    mediaHash
    summary
    createdAt
    contents {
      html
    }
    ...InfoHeaderArticleVersion
    ...MetaInfoArticleVersion
  }
  ${InfoHeader.fragments.articleVersion}
  ${MetaInfo.fragments.articleVersion}
`

export const ARTICLE_HISTORY_PUBLIC = gql`
  query ArticleHistoryPublic($mediaHash: String!, $version: ID!) {
    article(input: { mediaHash: $mediaHash }) {
      ...ArticleHistoryPublicArticle
    }
    version: node(input: { id: $version }) {
      ... on ArticleVersion {
        ...ArticleVersion
      }
    }
  }
  ${articleHistoryPublicFragment}
  ${articleVersionFragment}
`

export const ARTICLE_HISTORY_PUBLIC_BY_NODE_ID = gql`
  query ArticleHistoryPublicByNodeId($id: ID!, $version: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        ...ArticleHistoryPublicArticle
      }
    }
    version: node(input: { id: $version }) {
      ... on ArticleVersion {
        ...ArticleVersion
      }
    }
  }
  ${articleHistoryPublicFragment}
  ${articleVersionFragment}
`

export const ARTICLE_HISTORY_PRIVATE = gql`
  query ArticleHistoryPrivate($id: ID!, $version: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        access {
          circle {
            id
            ...CircleWallCirclePrivate
          }
        }
      }
    }
    version: node(input: { id: $version }) {
      id
      ... on ArticleVersion {
        contents {
          html
        }
      }
    }
  }
  ${circleWallFragments.circle.private}
`

export const ARTICLE_LATEST_VERSION = gql`
  query ArticleLatestVersion($mediaHash: String!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      versions(input: { first: 1 }) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

export const ARTICLE_LATEST_VERSION_BY_NODE_ID = gql`
  query ArticleLatestVersionByNodeId($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        versions(input: { first: 1 }) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`

export const ARTICLE_HISTORY_TRANSLATION = gql`
  query ArticleHistoryTranslation($version: ID!, $language: UserLanguage!) {
    version: node(input: { id: $version }) {
      ... on ArticleVersion {
        id
        translation(input: { language: $language }) {
          content
          title
          summary
          language
        }
      }
    }
  }
`
