import gql from 'graphql-tag'

import { BookmarkButton } from '~/components'

import DropdownActions from '../../DropdownActions'
import ReadTime from './ReadTime'

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
        ...ActionsReadTimeArticle
      }
      ${DropdownActions.fragments.article}
      ${ReadTime.fragments.article}
    `,
    private: gql`
      fragment FooterActionsArticlePrivate on Article {
        ...BookmarkArticlePrivate
      }
      ${BookmarkButton.fragments.article.private}
    `,
  },
}
