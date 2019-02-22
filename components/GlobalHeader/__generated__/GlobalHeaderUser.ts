/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GlobalHeaderUser
// ====================================================

export interface GlobalHeaderUser_status_MAT {
  __typename: "MAT";
  total: number;
}

export interface GlobalHeaderUser_status {
  __typename: "UserStatus";
  /**
   * Total MAT left in wallet
   */
  MAT: GlobalHeaderUser_status_MAT;
}

export interface GlobalHeaderUser {
  __typename: "User";
  id: string;
  /**
   * Display name on profile
   */
  displayName: string | null;
  status: GlobalHeaderUser_status | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
}
