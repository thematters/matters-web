import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import Content from './Content'
import FingerprintButton from './FingerprintButton'
import RelatedArticles from './RelatedArticles'
import State from './State'
import SupportWidget from './SupportWidget'
import TagList from './TagList'
import Toolbar from './Toolbar'
import CircleWall from './Wall/Circle'

export const ARTICLE_DETAIL_PUBLIC = gql`
  query ArticleDetailPublic(
    $mediaHash: String
    $includeCanSuperLike: Boolean = true
  ) {
    article(input: { mediaHash: $mediaHash }) {
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
      limitedFree
      author {
        ...UserDigestRichUserPublic
        ...UserDigestRichUserPrivate
      }
      collection(input: { first: 0 }) @connection(key: "articleCollection") {
        totalCount
      }
      circle {
        id
        ...CircleWallCirclePublic
      }
      ...ContentArticle
      ...TagListArticle
      ...RelatedArticles
      ...StateArticle
      ...FingerprintArticle
      ...ToolbarArticlePublic
      ...ToolbarArticlePrivate
      ...SupportWidgetArticlePublic
      ...SupportWidgetArticlePrivate
    }
  }
  ${Content.fragments.article}
  ${TagList.fragments.article}
  ${RelatedArticles.fragments.article}
  ${State.fragments.article}
  ${FingerprintButton.fragments.article}
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
  ${Toolbar.fragments.article.public}
  ${Toolbar.fragments.article.private}
  ${SupportWidget.fragments.article.public}
  ${SupportWidget.fragments.article.private}
  ${CircleWall.fragments.circle.public}
`

export const ARTICLE_DETAIL_PRIVATE = gql`
  query ArticleDetailPrivate(
    $mediaHash: String
    $includeContent: Boolean!
    $includeCanSuperLike: Boolean!
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      content @include(if: $includeContent)
      author {
        ...UserDigestRichUserPrivate
      }
      circle {
        ...CircleWallCirclePrivate
      }
      ...ToolbarArticlePrivate
      ...SupportWidgetArticlePrivate
    }
  }
  ${UserDigest.Rich.fragments.user.private}
  ${Toolbar.fragments.article.private}
  ${SupportWidget.fragments.article.private}
  ${CircleWall.fragments.circle.private}
`

export const ARTICLE_TRANSLATION = gql`
  query ArticleTranslation($mediaHash: String, $language: UserLanguage!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      translation(input: { language: $language }) {
        content
        title
      }
    }
  }
`
