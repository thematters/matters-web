import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { CircleCommentContent } from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import ReplyTo from '../ReplyTo'

export const fragments = {
  comment: {
    public: gql`
      fragment CircleCommentFeedCommentPublic on Comment {
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
        ...CircleCommentFooterActionsCommentPublic
        ...CircleCommentDropdownActionsCommentPublic
        ...CircleCommentContentCommentPublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ReplyTo.fragments.user}
      ${FooterActions.fragments.comment.public}
      ${DropdownActions.fragments.comment.public}
      ${CircleCommentContent.fragments.comment.public}
    `,
    private: gql`
      fragment CircleCommentFeedCommentPrivate on Comment {
        id
        ...CircleCommentFooterActionsCommentPrivate
        ...CircleCommentDropdownActionsCommentPrivate
        ...CircleCommentContentCommentPrivate
      }
      ${FooterActions.fragments.comment.private}
      ${DropdownActions.fragments.comment.private}
      ${CircleCommentContent.fragments.comment.private}
    `,
  },
}

export const REFETCH_CIRCLE_COMMENT = gql`
  query RefetchCircleComment($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...CircleCommentFeedCommentPublic
        ...CircleCommentFeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...CircleCommentFeedCommentPublic
              ...CircleCommentFeedCommentPrivate
            }
          }
        }
      }
    }
  }
  ${fragments.comment.public}
  ${fragments.comment.private}
`
