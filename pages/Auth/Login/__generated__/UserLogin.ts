/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserLoginInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserLogin
// ====================================================

export interface UserLogin_userLogin {
  __typename: "AuthResult";
  token: string | null;
}

export interface UserLogin {
  /**
   * login
   */
  userLogin: UserLogin_userLogin;
}

export interface UserLoginVariables {
  input: UserLoginInput;
}
