import gql from 'graphql-tag'

import { CommentBeta } from '~/components'

export const fragments = {
  comment: {
    public: gql`
      fragment FollowingFeedCommentPublic on Comment {
        id
        createdAt
        ...ContentCommentPublic
      }
      ${CommentBeta.Content.fragments.comment.public}
    `,
    private: gql`
      fragment FollowingFeedCommentPrivate on Comment {
        id
        ...ContentCommentPrivate
      }
      ${CommentBeta.Content.fragments.comment.private}
    `,
  },
}
