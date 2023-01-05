/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInfoInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserInfoProfile
// ====================================================

export interface UpdateUserInfoProfile_updateUserInfo_info {
  __typename: "UserInfo";
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
  /**
   * User desciption.
   */
  description: string | null;
}

export interface UpdateUserInfoProfile_updateUserInfo {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * User information.
   */
  info: UpdateUserInfoProfile_updateUserInfo_info;
}

export interface UpdateUserInfoProfile {
  /**
   * Update user information.
   */
  updateUserInfo: UpdateUserInfoProfile_updateUserInfo;
}

export interface UpdateUserInfoProfileVariables {
  input: UpdateUserInfoInput;
}
