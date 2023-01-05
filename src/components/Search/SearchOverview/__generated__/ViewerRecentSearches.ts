/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerRecentSearches
// ====================================================

export interface ViewerRecentSearches_viewer_activity_recentSearches_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ViewerRecentSearches_viewer_activity_recentSearches_edges {
  __typename: "RecentSearchEdge";
  cursor: string;
  node: string;
}

export interface ViewerRecentSearches_viewer_activity_recentSearches {
  __typename: "RecentSearchConnection";
  pageInfo: ViewerRecentSearches_viewer_activity_recentSearches_pageInfo;
  edges: ViewerRecentSearches_viewer_activity_recentSearches_edges[] | null;
}

export interface ViewerRecentSearches_viewer_activity {
  __typename: "UserActivity";
  /**
   * User search history.
   */
  recentSearches: ViewerRecentSearches_viewer_activity_recentSearches;
}

export interface ViewerRecentSearches_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Record of user activity, only accessable by current user.
   */
  activity: ViewerRecentSearches_viewer_activity;
}

export interface ViewerRecentSearches {
  viewer: ViewerRecentSearches_viewer | null;
}
