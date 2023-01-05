/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowerPrivate
// ====================================================

export interface UserFollowerPrivate_nodes_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface UserFollowerPrivate_nodes_User {
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

export type UserFollowerPrivate_nodes = UserFollowerPrivate_nodes_Article | UserFollowerPrivate_nodes_User;

export interface UserFollowerPrivate {
  nodes: UserFollowerPrivate_nodes[] | null;
}

export interface UserFollowerPrivateVariables {
  ids: string[];
}
