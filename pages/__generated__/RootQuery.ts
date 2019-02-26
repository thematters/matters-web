/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserLanguage, UserState } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RootQuery
// ====================================================

export interface RootQuery_viewer_settings {
  __typename: "UserSettings";
  /**
   * User language setting
   */
  language: UserLanguage;
}

export interface RootQuery_viewer_status_MAT {
  __typename: "MAT";
  total: number;
}

export interface RootQuery_viewer_status {
  __typename: "UserStatus";
  state: UserState;
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
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
  settings: RootQuery_viewer_settings;
  status: RootQuery_viewer_status | null;
  info: RootQuery_viewer_info;
}

export interface RootQuery {
  viewer: RootQuery_viewer | null;
}
