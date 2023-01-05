/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRegisterInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserRegister
// ====================================================

export interface UserRegister_userRegister {
  __typename: "AuthResult";
  auth: boolean;
}

export interface UserRegister {
  /**
   * Register user, can only be used on matters.news website.
   */
  userRegister: UserRegister_userRegister;
}

export interface UserRegisterVariables {
  input: UserRegisterInput;
}
