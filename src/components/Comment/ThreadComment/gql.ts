import gql from 'graphql-tag'

import Feed from '../Feed'

export const fragments = {
  comment: {
    public: gql`
      fragment ThreadCommentCommentPublic on Comment {
        id
        ...FeedCommentPublic
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentPublic
            }
          }
        }
      }
      ${Feed.fragments.comment.public}
    `,
    private: gql`
      fragment ThreadCommentCommentPrivate on Comment {
        id
        ...FeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentPrivate
            }
          }
        }
      }
      ${Feed.fragments.comment.private}
    `,
  },
}
