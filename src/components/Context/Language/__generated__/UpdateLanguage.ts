/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInfoInput, UserLanguage } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateLanguage
// ====================================================

export interface UpdateLanguage_updateUserInfo_settings {
  __typename: "UserSettings";
  /**
   * User language setting.
   */
  language: UserLanguage;
}

export interface UpdateLanguage_updateUserInfo {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: UpdateLanguage_updateUserInfo_settings;
}

export interface UpdateLanguage {
  /**
   * Update user information.
   */
  updateUserInfo: UpdateLanguage_updateUserInfo;
}

export interface UpdateLanguageVariables {
  input: UpdateUserInfoInput;
}
