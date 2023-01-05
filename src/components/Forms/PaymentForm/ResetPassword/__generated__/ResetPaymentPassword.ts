/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResetPasswordInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ResetPaymentPassword
// ====================================================

export interface ResetPaymentPassword {
  /**
   * Reset user or payment password.
   */
  resetPassword: boolean | null;
}

export interface ResetPaymentPasswordVariables {
  input: ResetPasswordInput;
}
