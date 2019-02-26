/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileUser
// ====================================================

export interface ProfileUser_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface ProfileUser_followees {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ProfileUser_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ProfileUser {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  info: ProfileUser_info;
  /**
   * Users that this user follows
   */
  followees: ProfileUser_followees;
  /**
   * Followers of this user
   */
  followers: ProfileUser_followers;
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
