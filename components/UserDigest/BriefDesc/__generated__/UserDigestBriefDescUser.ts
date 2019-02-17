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
  /**
   * Display name on profile
   */
  displayName: string;
  info: UserDigestBriefDescUser_info;
  /**
   * URL for avatar
   */
  avatar: any | null;
}
