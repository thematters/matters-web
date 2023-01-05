/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResetPasswordInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword {
  /**
   * Reset user or payment password.
   */
  resetPassword: boolean | null;
}

export interface ResetPasswordVariables {
  input: ResetPasswordInput;
}
