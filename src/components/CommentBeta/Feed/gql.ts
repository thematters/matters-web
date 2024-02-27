import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import Content from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'
import RoleLabel from '../RoleLabel'

export const fragments = {
  comment: {
    public: gql`
      fragment FeedCommentBetaPublic on Comment {
        id
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
        ...PinnedLabelBetaComment
        ...FooterActionsCommentBetaPublic
        ...DropdownActionsCommentPublic
        ...ContentCommentPublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ReplyTo.fragments.user}
      ${RoleLabel.fragments.comment}
      ${PinnedLabel.fragments.comment}
      ${FooterActions.fragments.comment.public}
      ${DropdownActions.fragments.comment.public}
      ${Content.fragments.comment.public}
    `,
    private: gql`
      fragment FeedCommentBetaPrivate on Comment {
        id
        ...FooterActionsCommentBetaPrivate
        ...DropdownActionsCommentPrivate
        ...ContentCommentPrivate
      }
      ${FooterActions.fragments.comment.private}
      ${DropdownActions.fragments.comment.private}
      ${Content.fragments.comment.private}
    `,
  },
}

export const REFETCH_COMMENT = gql`
  query RefetchCommentBeta($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...FeedCommentBetaPublic
        ...FeedCommentBetaPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentBetaPublic
              ...FeedCommentBetaPrivate
            }
          }
        }
      }
    }
  }
  ${fragments.comment.public}
  ${fragments.comment.private}
`
