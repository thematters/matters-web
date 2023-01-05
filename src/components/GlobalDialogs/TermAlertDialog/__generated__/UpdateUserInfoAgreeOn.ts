/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInfoInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserInfoAgreeOn
// ====================================================

export interface UpdateUserInfoAgreeOn_updateUserInfo_info {
  __typename: "UserInfo";
  /**
   * Timestamp of user agreement.
   */
  agreeOn: any | null;
}

export interface UpdateUserInfoAgreeOn_updateUserInfo {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User information.
   */
  info: UpdateUserInfoAgreeOn_updateUserInfo_info;
}

export interface UpdateUserInfoAgreeOn {
  /**
   * Update user information.
   */
  updateUserInfo: UpdateUserInfoAgreeOn_updateUserInfo;
}

export interface UpdateUserInfoAgreeOnVariables {
  input: UpdateUserInfoInput;
}
