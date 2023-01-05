/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleFollowersPrivate
// ====================================================

export interface CircleFollowersPrivate_nodes_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface CircleFollowersPrivate_nodes_User {
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

export type CircleFollowersPrivate_nodes = CircleFollowersPrivate_nodes_Article | CircleFollowersPrivate_nodes_User;

export interface CircleFollowersPrivate {
  nodes: CircleFollowersPrivate_nodes[] | null;
}

export interface CircleFollowersPrivateVariables {
  ids: string[];
}
