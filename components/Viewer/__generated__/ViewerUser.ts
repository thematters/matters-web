/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserLanguage, UserState } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ViewerUser
// ====================================================

export interface ViewerUser_settings {
  __typename: "UserSettings";
  /**
   * User language setting
   */
  language: UserLanguage;
}

export interface ViewerUser_status {
  __typename: "UserStatus";
  state: UserState;
}

export interface ViewerUser {
  __typename: "User";
  id: string;
  uuid: any;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
  settings: ViewerUser_settings;
  status: ViewerUser_status | null;
}
