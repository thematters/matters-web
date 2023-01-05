/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchUsersPrivate
// ====================================================

export interface SearchUsersPrivate_nodes_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface SearchUsersPrivate_nodes_User {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export type SearchUsersPrivate_nodes = SearchUsersPrivate_nodes_Article | SearchUsersPrivate_nodes_User;

export interface SearchUsersPrivate {
  nodes: SearchUsersPrivate_nodes[] | null;
}

export interface SearchUsersPrivateVariables {
  ids: string[];
}
