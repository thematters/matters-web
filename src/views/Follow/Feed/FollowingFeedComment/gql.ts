import gql from 'graphql-tag'

import { CommentContent } from '~/components'

export const fragments = {
  comment: {
    public: gql`
      fragment FollowingFeedCommentPublic on Comment {
        id
        createdAt
        ...CommentContentCommentPublic
      }
      ${CommentContent.fragments.comment.public}
    `,
    private: gql`
      fragment FollowingFeedCommentPrivate on Comment {
        id
        ...CommentContentCommentPrivate
      }
      ${CommentContent.fragments.comment.private}
    `,
  },
}
