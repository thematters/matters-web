/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleMembersPrivate
// ====================================================

export interface CircleMembersPrivate_nodes_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface CircleMembersPrivate_nodes_User {
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

export type CircleMembersPrivate_nodes = CircleMembersPrivate_nodes_Article | CircleMembersPrivate_nodes_User;

export interface CircleMembersPrivate {
  nodes: CircleMembersPrivate_nodes[] | null;
}

export interface CircleMembersPrivateVariables {
  ids: string[];
}
