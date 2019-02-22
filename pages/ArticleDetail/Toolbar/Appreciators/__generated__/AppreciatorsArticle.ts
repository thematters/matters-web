/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppreciatorsArticle
// ====================================================

export interface AppreciatorsArticle_appreciators_edges_node {
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

export interface AppreciatorsArticle_appreciators_edges {
  __typename: "UserEdge";
  cursor: string;
  node: AppreciatorsArticle_appreciators_edges_node;
}

export interface AppreciatorsArticle_appreciators {
  __typename: "UserConnection";
  totalCount: number;
  edges: AppreciatorsArticle_appreciators_edges[] | null;
}

export interface AppreciatorsArticle {
  __typename: "Article";
  id: string;
  appreciators: AppreciatorsArticle_appreciators;
}
