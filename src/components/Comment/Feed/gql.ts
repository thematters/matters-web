import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { CommentContent } from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'
import RoleLabel from '../RoleLabel'

export const fragments = {
  comment: {
    public: gql`
      fragment CommentFeedCommentPublic on Comment {
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
        ...CommentFooterActionsCommentPublic
        ...CommentDropdownActionsCommentPublic
        ...CommentContentCommentPublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ReplyTo.fragments.user}
      ${RoleLabel.fragments.comment}
      ${PinnedLabel.fragments.comment}
      ${FooterActions.fragments.comment.public}
      ${DropdownActions.fragments.comment.public}
      ${CommentContent.fragments.comment.public}
    `,
    private: gql`
      fragment CommentFeedCommentPrivate on Comment {
        id
        ...CommentFooterActionsCommentPrivate
        ...CommentDropdownActionsCommentPrivate
        ...CommentContentCommentPrivate
      }
      ${FooterActions.fragments.comment.private}
      ${DropdownActions.fragments.comment.private}
      ${CommentContent.fragments.comment.private}
    `,
  },
}

export const REFETCH_ARTICLE_COMMENT = gql`
  query RefetchArticleComment($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...CommentFeedCommentPublic
        ...CommentFeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...CommentFeedCommentPublic
              ...CommentFeedCommentPrivate
            }
          }
        }
      }
    }
  }
  ${fragments.comment.public}
  ${fragments.comment.private}
`
