import gql from 'graphql-tag'

import { ArticleCommentContent } from '~/components'

export const fragments = {
  comment: {
    public: gql`
      fragment FollowingFeedCommentPublic on Comment {
        id
        createdAt
        ...ArticleCommentContentCommentPublic
      }
      ${ArticleCommentContent.fragments.comment.public}
    `,
    private: gql`
      fragment FollowingFeedCommentPrivate on Comment {
        id
        ...ArticleCommentContentCommentPrivate
      }
      ${ArticleCommentContent.fragments.comment.private}
    `,
  },
}
