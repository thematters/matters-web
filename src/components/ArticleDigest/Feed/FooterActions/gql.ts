import gql from 'graphql-tag'

import { BookmarkButton } from '~/components'

import DropdownActions from '../../DropdownActions'

export const fragments = {
  article: {
    public: gql`
      fragment FooterActionsArticlePublic on Article {
        id
        title
        slug
        mediaHash
        createdAt
        author {
          id
          userName
        }
        ...DropdownActionsArticle
      }
      ${DropdownActions.fragments.article}
    `,
    private: gql`
      fragment FooterActionsArticlePrivate on Article {
        ...BookmarkArticlePrivate
      }
      ${BookmarkButton.fragments.article.private}
    `,
  },
}
