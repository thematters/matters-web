import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { ArticleCommentContent } from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'
import RoleLabel from '../RoleLabel'

export const fragments = {
  comment: {
    public: gql`
      fragment JournalCommentFeedCommentPublic on Comment {
        id
        type
        author {
          id
          ...UserDigestMiniUser
        }
        createdAt
        replyTo {
          id
          author {
            id
            ...ReplyToUser
          }
        }
        ...RoleLabelComment
        ...PinnedLabelComment
        ...ArticleCommentFooterActionsCommentPublic
        ...ArticleCommentDropdownActionsCommentPublic
        ...ArticleCommentContentCommentPublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ReplyTo.fragments.user}
      ${RoleLabel.fragments.comment}
      ${PinnedLabel.fragments.comment}
      ${FooterActions.fragments.comment.public}
      ${DropdownActions.fragments.comment.public}
      ${ArticleCommentContent.fragments.comment.public}
    `,
    private: gql`
      fragment JournalCommentFeedCommentPrivate on Comment {
        id
        ...ArticleCommentFooterActionsCommentPrivate
        ...ArticleCommentDropdownActionsCommentPrivate
        ...ArticleCommentContentCommentPrivate
      }
      ${FooterActions.fragments.comment.private}
      ${DropdownActions.fragments.comment.private}
      ${ArticleCommentContent.fragments.comment.private}
    `,
  },
}
