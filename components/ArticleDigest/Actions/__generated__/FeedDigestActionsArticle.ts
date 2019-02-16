/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedDigestActionsArticle
// ====================================================

export interface FeedDigestActionsArticle_comments {
  __typename: 'CommentConnection'
  totalCount: number
}

export interface FeedDigestActionsArticle {
  __typename: 'Article'
  createdAt: any
  /**
   * MAT recieved for this article
   */
  MAT: number
  comments: FeedDigestActionsArticle_comments
}
