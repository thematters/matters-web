/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SendVerificationCodeInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SendVerificationCode
// ====================================================

export interface SendVerificationCode {
  /**
   * Send verification code for email.
   */
  sendVerificationCode: boolean | null;
}

export interface SendVerificationCodeVariables {
  input: SendVerificationCodeInput;
}
