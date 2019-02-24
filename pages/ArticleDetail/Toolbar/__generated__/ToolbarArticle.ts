/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ToolbarArticle
// ====================================================

export interface ToolbarArticle_appreciators_edges_node {
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

export interface ToolbarArticle_appreciators_edges {
  __typename: "UserEdge";
  cursor: string;
  node: ToolbarArticle_appreciators_edges_node;
}

export interface ToolbarArticle_appreciators {
  __typename: "UserConnection";
  totalCount: number;
  edges: ToolbarArticle_appreciators_edges[] | null;
}

export interface ToolbarArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface ToolbarArticle {
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
  /**
   * limit the nuhmber of appreciate per user
   */
  appreciateLimit: number;
  appreciateLeft: number;
  appreciators: ToolbarArticle_appreciators;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
  comments: ToolbarArticle_comments;
}
