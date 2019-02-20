/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowState
// ====================================================

export interface UserFollowState_node_Article {
  __typename: "Article" | "Tag" | "Draft" | "Comment";
}

export interface UserFollowState_node_User {
  __typename: "User";
  id: string;
  /**
   * This user is following viewer
   */
  isFollower: boolean;
  /**
   * Viewer is following this user
   */
  isFollowee: boolean;
}

export type UserFollowState_node = UserFollowState_node_Article | UserFollowState_node_User;

export interface UserFollowState {
  node: UserFollowState_node | null;
}

export interface UserFollowStateVariables {
  id: string;
}
