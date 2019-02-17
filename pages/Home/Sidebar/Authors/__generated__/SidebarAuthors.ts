/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarAuthors
// ====================================================

export interface SidebarAuthors_viewer_recommendation_authors_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface SidebarAuthors_viewer_recommendation_authors_edges_node {
  __typename: "User";
  /**
   * Display name on profile
   */
  displayName: string;
  info: SidebarAuthors_viewer_recommendation_authors_edges_node_info;
  /**
   * This user is following viewer
   */
  isFollower: boolean;
  /**
   * Viewer is following this user
   */
  isFollowee: boolean;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface SidebarAuthors_viewer_recommendation_authors_edges {
  __typename: "UserEdge";
  cursor: string;
  node: SidebarAuthors_viewer_recommendation_authors_edges_node;
}

export interface SidebarAuthors_viewer_recommendation_authors {
  __typename: "UserConnection";
  edges: SidebarAuthors_viewer_recommendation_authors_edges[] | null;
}

export interface SidebarAuthors_viewer_recommendation {
  __typename: "Recommendation";
  authors: SidebarAuthors_viewer_recommendation_authors;
}

export interface SidebarAuthors_viewer {
  __typename: "User";
  id: string;
  recommendation: SidebarAuthors_viewer_recommendation;
}

export interface SidebarAuthors {
  viewer: SidebarAuthors_viewer | null;
}
