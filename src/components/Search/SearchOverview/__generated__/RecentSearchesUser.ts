/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RecentSearchesUser
// ====================================================

export interface RecentSearchesUser_activity_recentSearches_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface RecentSearchesUser_activity_recentSearches_edges {
  __typename: "RecentSearchEdge";
  cursor: string;
  node: string;
}

export interface RecentSearchesUser_activity_recentSearches {
  __typename: "RecentSearchConnection";
  pageInfo: RecentSearchesUser_activity_recentSearches_pageInfo;
  edges: RecentSearchesUser_activity_recentSearches_edges[] | null;
}

export interface RecentSearchesUser_activity {
  __typename: "UserActivity";
  /**
   * User search history.
   */
  recentSearches: RecentSearchesUser_activity_recentSearches;
}

export interface RecentSearchesUser {
  __typename: "User";
  /**
   * Record of user activity, only accessable by current user.
   */
  activity: RecentSearchesUser_activity;
}
