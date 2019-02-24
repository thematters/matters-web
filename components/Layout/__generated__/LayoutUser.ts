/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LayoutUser
// ====================================================

export interface LayoutUser_status_MAT {
  __typename: "MAT";
  total: number;
}

export interface LayoutUser_status {
  __typename: "UserStatus";
  /**
   * Total MAT left in wallet
   */
  MAT: LayoutUser_status_MAT;
}

export interface LayoutUser_info {
  __typename: "UserInfo";
  email: any | null;
}

export interface LayoutUser {
  __typename: "User";
  id: string;
  /**
   * Display name on profile
   */
  displayName: string | null;
  status: LayoutUser_status | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
  info: LayoutUser_info;
}
