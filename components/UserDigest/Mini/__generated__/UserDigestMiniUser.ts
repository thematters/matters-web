/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserDigestMiniUser
// ====================================================

export interface UserDigestMiniUser_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface UserDigestMiniUser {
  __typename: "User";
  info: UserDigestMiniUser_info;
  /**
   * URL for avatar
   */
  avatar: any | null;
}
