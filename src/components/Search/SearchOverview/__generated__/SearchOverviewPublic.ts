/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchOverviewPublic
// ====================================================

export interface SearchOverviewPublic_viewer_activity_recentSearches_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchOverviewPublic_viewer_activity_recentSearches_edges {
  __typename: "RecentSearchEdge";
  cursor: string;
  node: string;
}

export interface SearchOverviewPublic_viewer_activity_recentSearches {
  __typename: "RecentSearchConnection";
  pageInfo: SearchOverviewPublic_viewer_activity_recentSearches_pageInfo;
  edges: SearchOverviewPublic_viewer_activity_recentSearches_edges[] | null;
}

export interface SearchOverviewPublic_viewer_activity {
  __typename: "UserActivity";
  /**
   * User search history.
   */
  recentSearches: SearchOverviewPublic_viewer_activity_recentSearches;
}

export interface SearchOverviewPublic_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Record of user activity, only accessable by current user.
   */
  activity: SearchOverviewPublic_viewer_activity;
}

export interface SearchOverviewPublic {
  frequentSearch: string[] | null;
  viewer: SearchOverviewPublic_viewer | null;
}
