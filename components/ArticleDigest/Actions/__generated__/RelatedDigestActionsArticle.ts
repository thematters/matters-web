/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RelatedDigestActionsArticle
// ====================================================

export interface RelatedDigestActionsArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface RelatedDigestActionsArticle {
  __typename: "Article";
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: RelatedDigestActionsArticle_comments;
}
