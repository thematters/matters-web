/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInfoInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePaymentPointer
// ====================================================

export interface UpdatePaymentPointer_updateUserInfo {
  __typename: "User";
  /**
   * Payment pointer that resolves to Open Payments endpoints
   */
  paymentPointer: string | null;
}

export interface UpdatePaymentPointer {
  /**
   * Update user information.
   */
  updateUserInfo: UpdatePaymentPointer_updateUserInfo;
}

export interface UpdatePaymentPointerVariables {
  input: UpdateUserInfoInput;
}
