/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FollowUser
// ====================================================

export interface FollowUser_followUser {
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

export interface FollowUser {
  /**
   * follow/unfollow
   */
  followUser: FollowUser_followUser;
}

export interface FollowUserVariables {
  id: string;
}
