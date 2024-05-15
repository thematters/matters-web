import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { AuthorSidebar } from './AuthorSidebar'
import { FromAuthor } from './AuthorSidebar/FromAuthor'
import { RelatedArticles } from './AuthorSidebar/RelatedArticles'
import MetaInfo from './MetaInfo'
import StickyTopBanner from './StickyTopBanner'
import { fragments as supportWidgetFragments } from './Support/SupportWidget/gql'
import TagList from './TagList'
import DesktopToolbar from './Toolbar/DesktopToolbar'
import FixedToolbar from './Toolbar/FixedToolbar'
import FloatToolbar from './Toolbar/FloatToolbar'
import { fragments as circleWallFragments } from './Wall/Circle/gql'

const articlePublicFragment = gql`
  fragment ArticlePublicArticle on Article {
    id
    title
    slug
    shortHash
    dataHash
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
    commentCount
    comments(input: { filter: { state: active, parentComment: null } }) {
      totalCount
    }
    license
    sensitiveByAuthor
    sensitiveByAdmin
    requestForDonation
    replyToDonator
    translation(input: { language: $language })
      @include(if: $includeTranslation) {
      content
      title
      summary
      language
    }
    availableTranslations
    contents {
      html
    }
    ...AuthorSidebarArticle
    ...MetaInfoArticle
    ...TagListArticle
    ...AuthorSidebarRelatedArticles
    ...AuthorSidebarFromAuthor
    ...StateArticle
    ...DesktopToolbarArticlePublic
    ...DesktopToolbarArticlePrivate
    ...FixedToolbarArticlePublic
    ...FixedToolbarArticlePrivate
    ...FloatToolbarArticlePublic
    ...FloatToolbarArticlePrivate
    ...SupportWidgetArticlePublic
    ...SupportWidgetArticlePrivate
  }
  ${AuthorSidebar.fragments.article}
  ${MetaInfo.fragments.article}
  ${TagList.fragments.article}
  ${RelatedArticles.fragments.article}
  ${FromAuthor.fragments.article}
  ${StickyTopBanner.fragments.article}
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
  ${DesktopToolbar.fragments.article.public}
  ${DesktopToolbar.fragments.article.private}
  ${FixedToolbar.fragments.article.public}
  ${FixedToolbar.fragments.article.private}
  ${FloatToolbar.fragments.article.public}
  ${FloatToolbar.fragments.article.private}
  ${supportWidgetFragments.article.public}
  ${supportWidgetFragments.article.private}
  ${circleWallFragments.circle.public}
  ${circleWallFragments.circle.private}
`

export const ARTICLE_AVAILABLE_TRANSLATIONS = gql`
  query ArticleAvailableTranslations($shortHash: String) {
    article(input: { shortHash: $shortHash }) {
      id
      availableTranslations
    }
  }
`

export const ARTICLE_DETAIL_PUBLIC = gql`
  query ArticleDetailPublic(
    $shortHash: String
    $language: UserLanguage!
    $includeTranslation: Boolean = false
    $includeCanSuperLike: Boolean = true
  ) {
    article(input: { shortHash: $shortHash }) {
      ...ArticlePublicArticle
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
        contents {
          html
        }
        ...DesktopToolbarArticlePrivate
        ...FixedToolbarArticlePrivate
        ...FloatToolbarArticlePrivate
        ...SupportWidgetArticlePrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
  ${DesktopToolbar.fragments.article.private}
  ${FixedToolbar.fragments.article.private}
  ${FloatToolbar.fragments.article.private}
  ${supportWidgetFragments.article.private}
  ${circleWallFragments.circle.private}
`

export const ARTICLE_TRANSLATION = gql`
  query ArticleTranslation($shortHash: String!, $language: UserLanguage!) {
    article(input: { shortHash: $shortHash }) {
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
