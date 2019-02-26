/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserProfule
// ====================================================

export interface UserProfule_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface UserProfule_followees {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserProfule_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserProfule {
  __typename: "User";
  id: string;
  /**
   * Display name on profile
   */
  displayName: string | null;
  info: UserProfule_info;
  /**
   * Users that this user follows
   */
  followees: UserProfule_followees;
  /**
   * Followers of this user
   */
  followers: UserProfule_followers;
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
