import gql from 'graphql-tag'

import Feed from '../Feed'

export const fragments = {
  comment: {
    public: gql`
      fragment ThreadCommentCommentBetaPublic on Comment {
        id
        ...FeedCommentBetaPublic
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentBetaPublic
            }
          }
        }
      }
      ${Feed.fragments.comment.public}
    `,
    private: gql`
      fragment ThreadCommentCommentBetaPrivate on Comment {
        id
        ...FeedCommentBetaPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...FeedCommentBetaPrivate
            }
          }
        }
      }
      ${Feed.fragments.comment.private}
    `,
  },
}
