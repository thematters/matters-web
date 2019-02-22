/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllAuthors
// ====================================================

export interface AllAuthors_viewer_recommendation_authors_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface AllAuthors_viewer_recommendation_authors_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface AllAuthors_viewer_recommendation_authors_edges_node {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  info: AllAuthors_viewer_recommendation_authors_edges_node_info;
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

export interface AllAuthors_viewer_recommendation_authors_edges {
  __typename: "UserEdge";
  cursor: string;
  node: AllAuthors_viewer_recommendation_authors_edges_node;
}

export interface AllAuthors_viewer_recommendation_authors {
  __typename: "UserConnection";
  pageInfo: AllAuthors_viewer_recommendation_authors_pageInfo;
  edges: AllAuthors_viewer_recommendation_authors_edges[] | null;
}

export interface AllAuthors_viewer_recommendation {
  __typename: "Recommendation";
  authors: AllAuthors_viewer_recommendation_authors;
}

export interface AllAuthors_viewer {
  __typename: "User";
  id: string;
  recommendation: AllAuthors_viewer_recommendation;
}

export interface AllAuthors {
  viewer: AllAuthors_viewer | null;
}

export interface AllAuthorsVariables {
  cursor?: string | null;
}
