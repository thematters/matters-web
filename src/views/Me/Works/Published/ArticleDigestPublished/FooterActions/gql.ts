import gql from 'graphql-tag'

import DropdownActions from '~/components/ArticleDigest/DropdownActions'
import { BookmarkButton } from '~/components/Buttons/Bookmark'

export const fragments = {
  article: {
    public: gql`
      fragment FooterActionsPublishedArticlePublic on Article {
        id
        title
        slug
        shortHash
        createdAt
        readerCount
        appreciationsReceivedTotal
        commentCount
        donationCount
        ...DropdownActionsArticle
      }
      ${DropdownActions.fragments.article}
    `,
    private: gql`
      fragment FooterActionsPublishedArticlePrivate on Article {
        ...BookmarkArticlePrivate
      }
      ${BookmarkButton.fragments.article.private}
    `,
  },
}
