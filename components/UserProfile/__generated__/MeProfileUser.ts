/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeProfileUser
// ====================================================

export interface MeProfileUser_viewer_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface MeProfileUser_viewer_followees {
  __typename: "UserConnection";
  totalCount: number;
}

export interface MeProfileUser_viewer_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface MeProfileUser_viewer {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  info: MeProfileUser_viewer_info;
  /**
   * Users that this user follows
   */
  followees: MeProfileUser_viewer_followees;
  /**
   * Followers of this user
   */
  followers: MeProfileUser_viewer_followers;
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

export interface MeProfileUser {
  viewer: MeProfileUser_viewer | null;
}

export interface MeProfileUserVariables {
  isMe?: boolean | null;
}
