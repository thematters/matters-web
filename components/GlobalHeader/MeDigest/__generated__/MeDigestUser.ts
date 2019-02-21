/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MeDigestUser
// ====================================================

export interface MeDigestUser_status_MAT {
  __typename: "MAT";
  total: number;
}

export interface MeDigestUser_status {
  __typename: "UserStatus";
  /**
   * Total MAT left in wallet
   */
  MAT: MeDigestUser_status_MAT;
}

export interface MeDigestUser {
  __typename: "User";
  id: string;
  /**
   * Display name on profile
   */
  displayName: string;
  status: MeDigestUser_status;
  /**
   * URL for avatar
   */
  avatar: any | null;
}
