/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleFollowUser
// ====================================================

export interface ToggleFollowUser_toggleFollowUser {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
}

export interface ToggleFollowUser {
  /**
   * Follow or Unfollow current user.
   */
  toggleFollowUser: ToggleFollowUser_toggleFollowUser;
}

export interface ToggleFollowUserVariables {
  id: string;
  enabled?: boolean | null;
}
