/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DigestActionsArticle
// ====================================================

export interface DigestActionsArticle_author {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface DigestActionsArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface DigestActionsArticle {
  __typename: "Article";
  author: DigestActionsArticle_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: DigestActionsArticle_comments;
  id: string;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}
