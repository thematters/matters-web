import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Buttons/Bookmark'

import DropdownActions from '../../DropdownActions'

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
