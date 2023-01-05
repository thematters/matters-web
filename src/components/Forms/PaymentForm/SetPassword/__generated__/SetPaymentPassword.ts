/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetPaymentPassword
// ====================================================

export interface SetPaymentPassword_updateUserInfo_status {
  __typename: "UserStatus";
  /**
   * Whether user already set payment password.
   */
  hasPaymentPassword: boolean;
}

export interface SetPaymentPassword_updateUserInfo {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Status of current user.
   */
  status: SetPaymentPassword_updateUserInfo_status | null;
}

export interface SetPaymentPassword {
  /**
   * Update user information.
   */
  updateUserInfo: SetPaymentPassword_updateUserInfo;
}

export interface SetPaymentPasswordVariables {
  password?: string | null;
}
