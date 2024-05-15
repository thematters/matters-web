import gql from 'graphql-tag'

import { BookmarkButton } from '~/components'
import DropdownActions from '~/components/ArticleDigest/DropdownActions'

import AppreciationButton from '../AppreciationButton'
import CommentButton from './Button/CommentButton'
import DonationButton from './Button/DonationButton'

export const fragments = {
  article: {
    public: gql`
      fragment ToolbarArticlePublic on Article {
        id
        title
        tags {
          content
        }
        ...DropdownActionsArticle
        ...DonationButtonArticle
        ...AppreciationButtonArticlePublic
        ...CommentButtonArticlePublic
      }
      ${DonationButton.fragments.article}
      ${DropdownActions.fragments.article}
      ${AppreciationButton.fragments.article.public}
      ${CommentButton.fragments.article.public}
    `,
    private: gql`
      fragment ToolbarArticlePrivate on Article {
        id
        ...BookmarkArticlePrivate
        ...AppreciationButtonArticlePrivate
        ...CommentButtonArticlePrivate
      }
      ${AppreciationButton.fragments.article.private}
      ${BookmarkButton.fragments.article.private}
      ${CommentButton.fragments.article.private}
    `,
  },
}
