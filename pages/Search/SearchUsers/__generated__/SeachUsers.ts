/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeachUsers
// ====================================================

export interface SeachUsers_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SeachUsers_search_edges_node_Article {
  __typename: "Article" | "Tag" | "Draft" | "Comment";
}

export interface SeachUsers_search_edges_node_User_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface SeachUsers_search_edges_node_User {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  info: SeachUsers_search_edges_node_User_info;
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

export type SeachUsers_search_edges_node = SeachUsers_search_edges_node_Article | SeachUsers_search_edges_node_User;

export interface SeachUsers_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SeachUsers_search_edges_node;
}

export interface SeachUsers_search {
  __typename: "SearchResultConnection";
  pageInfo: SeachUsers_search_pageInfo;
  edges: SeachUsers_search_edges[] | null;
}

export interface SeachUsers {
  search: SeachUsers_search;
}

export interface SeachUsersVariables {
  first: number;
  key: string;
  cursor?: string | null;
}
