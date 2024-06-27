import gql from 'graphql-tag'

import { CircleCommentFeed } from '../Feed'

export const fragments = {
  comment: {
    public: gql`
      fragment CircleCommentThreadCommentCommentPublic on Comment {
        id
        ...CircleCommentFeedCommentPublic
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...CircleCommentFeedCommentPublic
            }
          }
        }
      }
      ${CircleCommentFeed.fragments.comment.public}
    `,
    private: gql`
      fragment CircleCommentThreadCommentCommentPrivate on Comment {
        id
        ...CircleCommentFeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...CircleCommentFeedCommentPrivate
            }
          }
        }
      }
      ${CircleCommentFeed.fragments.comment.private}
    `,
  },
}
