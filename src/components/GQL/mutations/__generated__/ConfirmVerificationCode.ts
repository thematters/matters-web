/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConfirmVerificationCodeInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ConfirmVerificationCode
// ====================================================

export interface ConfirmVerificationCode {
  /**
   * Confirm verification code from email.
   */
  confirmVerificationCode: string;
}

export interface ConfirmVerificationCodeVariables {
  input: ConfirmVerificationCodeInput;
}
