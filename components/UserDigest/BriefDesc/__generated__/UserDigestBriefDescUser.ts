/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserDigestBriefDescUser
// ====================================================

export interface UserDigestBriefDescUser_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface UserDigestBriefDescUser {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  info: UserDigestBriefDescUser_info;
  /**
   * URL for avatar
   */
  avatar: any | null;
}
