/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInfoInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserInfoUserName
// ====================================================

export interface UpdateUserInfoUserName_updateUserInfo {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface UpdateUserInfoUserName {
  /**
   * Update user information.
   */
  updateUserInfo: UpdateUserInfoUserName_updateUserInfo;
}

export interface UpdateUserInfoUserNameVariables {
  input: UpdateUserInfoInput;
}
