import gql from 'graphql-tag'

import { Comment } from '~/components'

export const fragments = {
  comment: {
    public: gql`
      fragment FollowFeedCommentPublic on Comment {
        id
        createdAt
        ...ContentCommentPublic
      }
      ${Comment.Content.fragments.comment.public}
    `,
    private: gql`
      fragment FollowFeedCommentPrivate on Comment {
        id
        ...ContentCommentPrivate
      }
      ${Comment.Content.fragments.comment.private}
    `,
  },
}
