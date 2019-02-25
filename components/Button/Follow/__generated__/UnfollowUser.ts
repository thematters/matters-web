/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnfollowUser
// ====================================================

export interface UnfollowUser_unfollowUser {
  __typename: "User";
  id: string;
  /**
   * Viewer is following this user
   */
  isFollowee: boolean;
  /**
   * This user is following viewer
   */
  isFollower: boolean;
}

export interface UnfollowUser {
  unfollowUser: UnfollowUser_unfollowUser;
}

export interface UnfollowUserVariables {
  id: string;
}
