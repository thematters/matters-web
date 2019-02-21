/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PickAuthors
// ====================================================

export interface PickAuthors_viewer_recommendation_authors_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface PickAuthors_viewer_recommendation_authors_edges_node {
  __typename: "User";
  id: string;
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  info: PickAuthors_viewer_recommendation_authors_edges_node_info;
  /**
   * URL for avatar
   */
  avatar: any | null;
  /**
   * This user is following viewer
   */
  isFollower: boolean;
  /**
   * Viewer is following this user
   */
  isFollowee: boolean;
}

export interface PickAuthors_viewer_recommendation_authors_edges {
  __typename: "UserEdge";
  cursor: string;
  node: PickAuthors_viewer_recommendation_authors_edges_node;
}

export interface PickAuthors_viewer_recommendation_authors {
  __typename: "UserConnection";
  edges: PickAuthors_viewer_recommendation_authors_edges[] | null;
}

export interface PickAuthors_viewer_recommendation {
  __typename: "Recommendation";
  authors: PickAuthors_viewer_recommendation_authors;
}

export interface PickAuthors_viewer {
  __typename: "User";
  id: string;
  recommendation: PickAuthors_viewer_recommendation;
}

export interface PickAuthors {
  viewer: PickAuthors_viewer | null;
}
