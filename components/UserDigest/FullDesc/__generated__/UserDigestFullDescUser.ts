/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserDigestFullDescUser
// ====================================================

export interface UserDigestFullDescUser_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface UserDigestFullDescUser {
  __typename: "User";
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  info: UserDigestFullDescUser_info;
  /**
   * This user is following viewer
   */
  isFollower: boolean;
  /**
   * Viewer is following this user
   */
  isFollowee: boolean;
  /**
   * URL for avatar
   */
  avatar: any | null;
}
