/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchAutoComplete
// ====================================================

export interface SearchAutoComplete_viewer_activity_recentSearches_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchAutoComplete_viewer_activity_recentSearches_edges {
  __typename: "RecentSearchEdge";
  cursor: string;
  node: string;
}

export interface SearchAutoComplete_viewer_activity_recentSearches {
  __typename: "RecentSearchConnection";
  pageInfo: SearchAutoComplete_viewer_activity_recentSearches_pageInfo;
  edges: SearchAutoComplete_viewer_activity_recentSearches_edges[] | null;
}

export interface SearchAutoComplete_viewer_activity {
  __typename: "UserActivity";
  recentSearches: SearchAutoComplete_viewer_activity_recentSearches;
}

export interface SearchAutoComplete_viewer {
  __typename: "User";
  id: string;
  activity: SearchAutoComplete_viewer_activity;
}

export interface SearchAutoComplete {
  frequentSearch: string[] | null;
  viewer: SearchAutoComplete_viewer | null;
}
