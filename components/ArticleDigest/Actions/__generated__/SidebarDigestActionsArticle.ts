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
  id: string;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  /**
   * Viewer has appreciate
   */
  hasAppreciate: boolean;
  comments: SidebarDigestActionsArticle_comments;
}
