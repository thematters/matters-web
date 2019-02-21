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
  id: string;
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  info: UserDigestFullDescUser_info;
  /**
   * URL for avatar
   */
  avatar: any | null;
  /**
   * This user is following viewer
   */
  isFollower: boolean;
  /**
   * Viewer is following this user
   */
  isFollowee: boolean;
}
