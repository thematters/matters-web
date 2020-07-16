import { gql } from '@apollo/client'

import { UserDigest } from '~/components'

import Content from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'

export const fragments = {
  comment: {
    public: gql`
      fragment FeedCommentPublic on Comment {
        id
        author {
          id
          ...UserDigestMiniUser
        }
        replyTo {
          id
          author {
            id
            ...ReplyToUser
          }
        }
        ...PinnedLabelComment
        ...FooterActionsCommentPublic
        ...DropdownActionsCommentPublic
        ...ContentCommentPublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ReplyTo.fragments.user}
      ${PinnedLabel.fragments.comment}
      ${FooterActions.fragments.comment.public}
      ${DropdownActions.fragments.comment.public}
      ${Content.fragments.comment.public}
    `,
    private: gql`
      fragment FeedCommentPrivate on Comment {
        id
        ...FooterActionsCommentPrivate
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
  query RefetchComment($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...FeedCommentPublic
        ...FeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentPublic
              ...FeedCommentPrivate
            }
          }
        }
      }
    }
  }
  ${fragments.comment.public}
  ${fragments.comment.private}
`
