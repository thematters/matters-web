/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RootQuery
// ====================================================

export interface RootQuery_viewer_status_MAT {
  __typename: "MAT";
  total: number;
}

export interface RootQuery_viewer_status {
  __typename: "UserStatus";
  /**
   * Total MAT left in wallet
   */
  MAT: RootQuery_viewer_status_MAT;
}

export interface RootQuery_viewer_info {
  __typename: "UserInfo";
  email: any | null;
}

export interface RootQuery_viewer {
  __typename: "User";
  id: string;
  /**
   * Display name on profile
   */
  displayName: string | null;
  status: RootQuery_viewer_status | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
  info: RootQuery_viewer_info;
}

export interface RootQuery {
  viewer: RootQuery_viewer | null;
}
