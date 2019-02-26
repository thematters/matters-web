/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfileUser
// ====================================================

export interface UserProfileUser_user_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface UserProfileUser_user_followees {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserProfileUser_user_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserProfileUser_user {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  info: UserProfileUser_user_info;
  /**
   * Users that this user follows
   */
  followees: UserProfileUser_user_followees;
  /**
   * Followers of this user
   */
  followers: UserProfileUser_user_followers;
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

export interface UserProfileUser {
  user: UserProfileUser_user | null;
}

export interface UserProfileUserVariables {
  userName: string;
  isMe?: boolean | null;
}
