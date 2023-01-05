/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangeEmailInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ChangeEmail
// ====================================================

export interface ChangeEmail_changeEmail_info {
  __typename: "UserInfo";
  /**
   * User email.
   */
  email: any | null;
}

export interface ChangeEmail_changeEmail {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User information.
   */
  info: ChangeEmail_changeEmail_info;
}

export interface ChangeEmail {
  /**
   * Change user email.
   */
  changeEmail: ChangeEmail_changeEmail;
}

export interface ChangeEmailVariables {
  input: ChangeEmailInput;
}
