/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SidebarDigestActionsArticle
// ====================================================

export interface SidebarDigestActionsArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface SidebarDigestActionsArticle {
  __typename: "Article";
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: SidebarDigestActionsArticle_comments;
}
