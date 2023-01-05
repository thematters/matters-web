/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchOverviewPrivate
// ====================================================

export interface SearchOverviewPrivate_viewer_activity_recentSearches_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchOverviewPrivate_viewer_activity_recentSearches_edges {
  __typename: "RecentSearchEdge";
  cursor: string;
  node: string;
}

export interface SearchOverviewPrivate_viewer_activity_recentSearches {
  __typename: "RecentSearchConnection";
  pageInfo: SearchOverviewPrivate_viewer_activity_recentSearches_pageInfo;
  edges: SearchOverviewPrivate_viewer_activity_recentSearches_edges[] | null;
}

export interface SearchOverviewPrivate_viewer_activity {
  __typename: "UserActivity";
  /**
   * User search history.
   */
  recentSearches: SearchOverviewPrivate_viewer_activity_recentSearches;
}

export interface SearchOverviewPrivate_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Record of user activity, only accessable by current user.
   */
  activity: SearchOverviewPrivate_viewer_activity;
}

export interface SearchOverviewPrivate {
  viewer: SearchOverviewPrivate_viewer | null;
}
