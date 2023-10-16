import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import Content from './Content'
import MetaInfo from './MetaInfo'
import RelatedArticles from './RelatedArticles'
import State from './State'
import { fragments as supportWidgetFragments } from './SupportWidget/gql'
import TagList from './TagList'
import Toolbar from './Toolbar'
import { fragments as circleWallFragments } from './Wall/Circle/gql'

const articlePublicFragment = gql`
  fragment ArticlePublicArticle on Article {
    id
    title
    slug
    mediaHash
    state
    cover
    summary
    summaryCustomized
    createdAt
    revisedAt
    language
    author {
      id
      paymentPointer
      ...UserDigestRichUserPublic
      ...UserDigestRichUserPrivate
    }
    collection(input: { first: 0 }) @connection(key: "articleCollection") {
      totalCount
    }
    access {
      type
      circle {
        id
        ...CircleWallCirclePublic
        ...CircleWallCirclePrivate
      }
    }
    canComment
    license
    sensitiveByAuthor
    sensitiveByAdmin
    requestForDonation
    replyToDonator
    drafts {
      id
      mediaHash
      publishState
      iscnPublish
    }
    translation(input: { language: $language })
      @include(if: $includeTranslation) {
      content
      title
      summary
      language
    }
    availableTranslations
    ...MetaInfoArticle
    ...ContentArticle
    ...TagListArticle
    ...RelatedArticles
    ...StateArticle
    ...ToolbarArticlePublic
    ...ToolbarArticlePrivate
    ...SupportWidgetArticlePublic
    ...SupportWidgetArticlePrivate
  }
  ${MetaInfo.fragments.article}
  ${Content.fragments.article}
  ${TagList.fragments.article}
  ${RelatedArticles.fragments.article}
  ${State.fragments.article}
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
  ${Toolbar.fragments.article.public}
  ${Toolbar.fragments.article.private}
  ${supportWidgetFragments.article.public}
  ${supportWidgetFragments.article.private}
  ${circleWallFragments.circle.public}
  ${circleWallFragments.circle.private}
`

export const ARTICLE_AVAILABLE_TRANSLATIONS = gql`
  query ArticleAvailableTranslations($mediaHash: String!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      availableTranslations
    }
  }
`

export const ARTICLE_AVAILABLE_TRANSLATIONS_BY_NODE_ID = gql`
  query ArticleAvailableTranslationsByNodeId($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        availableTranslations
      }
    }
  }
`

export const ARTICLE_DETAIL_PUBLIC = gql`
  query ArticleDetailPublic(
    $mediaHash: String!
    $language: UserLanguage!
    $includeTranslation: Boolean = false
    $includeCanSuperLike: Boolean = true
  ) {
    article(input: { mediaHash: $mediaHash }) {
      ...ArticlePublicArticle
    }
  }
  ${articlePublicFragment}
`

export const ARTICLE_DETAIL_PUBLIC_BY_NODE_ID = gql`
  query ArticleDetailPublicByNodeId(
    $id: ID!
    $language: UserLanguage!
    $includeTranslation: Boolean = false
    $includeCanSuperLike: Boolean = true
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        ...ArticlePublicArticle
      }
    }
  }
  ${articlePublicFragment}
`

export const ARTICLE_DETAIL_PRIVATE = gql`
  query ArticleDetailPrivate($id: ID!, $includeCanSuperLike: Boolean!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        author {
          id
          ...UserDigestRichUserPrivate
        }
        access {
          circle {
            id
            ...CircleWallCirclePrivate
          }
        }
        ...ContentArticle
        ...ToolbarArticlePrivate
        ...SupportWidgetArticlePrivate
      }
    }
  }
  ${Content.fragments.article}
  ${UserDigest.Rich.fragments.user.private}
  ${Toolbar.fragments.article.private}
  ${supportWidgetFragments.article.private}
  ${circleWallFragments.circle.private}
`

export const ARTICLE_TRANSLATION = gql`
  query ArticleTranslation($mediaHash: String!, $language: UserLanguage!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      translation(input: { language: $language }) {
        content
        title
        summary
        language
      }
    }
  }
`
