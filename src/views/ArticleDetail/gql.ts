import { gql } from '@apollo/client'

import { UserDigest } from '~/components/UserDigest'

import Content from './Content'
import FingerprintButton from './FingerprintButton'
import RelatedArticles from './RelatedArticles'
import State from './State'
import TagList from './TagList'
import Toolbar from './Toolbar'

export const ARTICLE_DETAIL_PUBLIC = gql`
  query ArticleDetailPublic($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      title
      slug
      mediaHash
      state
      public
      cover
      summary
      createdAt
      language
      author {
        ...UserDigestRichUserPublic
        ...UserDigestRichUserPrivate
      }
      collection(input: { first: 0 }) @connection(key: "articleCollection") {
        totalCount
      }
      ...ContentArticle
      ...TagListArticle
      ...RelatedArticles
      ...StateArticle
      ...FingerprintArticle
      ...ToolbarArticlePublic
      ...ToolbarArticlePrivate
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
`

export const ARTICLE_DETAIL_PRIVATE = gql`
  query ArticleDetailPrivate($mediaHash: String, $includeContent: Boolean!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      content @include(if: $includeContent)
      author {
        ...UserDigestRichUserPrivate
      }
      ...ToolbarArticlePrivate
    }
  }
  ${UserDigest.Rich.fragments.user.private}
  ${Toolbar.fragments.article.private}
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
