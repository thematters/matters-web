/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Payout
// ====================================================

export interface Payout_payout {
  __typename: "Transaction";
  id: string;
  state: TransactionState;
}

export interface Payout {
  /**
   * Payout to user
   */
  payout: Payout_payout;
}

export interface PayoutVariables {
  amount: any;
  password: string;
}
