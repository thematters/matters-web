/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowingUsersPrivate
// ====================================================

export interface UserFollowingUsersPrivate_nodes_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface UserFollowingUsersPrivate_nodes_User {
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

export type UserFollowingUsersPrivate_nodes = UserFollowingUsersPrivate_nodes_Article | UserFollowingUsersPrivate_nodes_User;

export interface UserFollowingUsersPrivate {
  nodes: UserFollowingUsersPrivate_nodes[] | null;
}

export interface UserFollowingUsersPrivateVariables {
  ids: string[];
}
