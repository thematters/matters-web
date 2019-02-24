/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeatureDigestActionsArticle
// ====================================================

export interface FeatureDigestActionsArticle_author {
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

export interface FeatureDigestActionsArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface FeatureDigestActionsArticle {
  __typename: "Article";
  author: FeatureDigestActionsArticle_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: FeatureDigestActionsArticle_comments;
  id: string;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}
