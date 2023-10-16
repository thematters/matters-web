import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Buttons/Bookmark'
import { CircleDigest } from '~/components/CircleDigest'

import DropdownActions from '../../DropdownActions'
import DonationCount from './DonationCount'
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
        access {
          type
          circle {
            id
            name
            ...DigestTitleCircle
          }
        }
        ...DropdownActionsArticle
        ...ActionsReadTimeArticle
        ...ActionsDonationCountArticle
      }
      ${DropdownActions.fragments.article}
      ${ReadTime.fragments.article}
      ${DonationCount.fragments.article}
      ${CircleDigest.Title.fragments.circle}
    `,
    private: gql`
      fragment FooterActionsArticlePrivate on Article {
        ...BookmarkArticlePrivate
      }
      ${BookmarkButton.fragments.article.private}
    `,
  },
}
