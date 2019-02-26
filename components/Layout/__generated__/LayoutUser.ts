/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserLanguage, UserState } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: LayoutUser
// ====================================================

export interface LayoutUser_settings {
  __typename: "UserSettings";
  /**
   * User language setting
   */
  language: UserLanguage;
}

export interface LayoutUser_status_MAT {
  __typename: "MAT";
  total: number;
}

export interface LayoutUser_status {
  __typename: "UserStatus";
  state: UserState;
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
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
  settings: LayoutUser_settings;
  status: LayoutUser_status | null;
  info: LayoutUser_info;
}
