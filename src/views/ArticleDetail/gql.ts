import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import Content from './Content'
import MetaInfo from './MetaInfo'
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
  ${SupportWidget.fragments.article.public}
  ${SupportWidget.fragments.article.private}
  ${CircleWall.fragments.circle.public}
  ${CircleWall.fragments.circle.private}
`

export const ARTICLE_DETAIL_PRIVATE = gql`
  query ArticleDetailPrivate(
    $mediaHash: String
    $includeCanSuperLike: Boolean!
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      content
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
