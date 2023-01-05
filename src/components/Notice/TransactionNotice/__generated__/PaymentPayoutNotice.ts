/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PaymentPayoutNotice
// ====================================================

export interface PaymentPayoutNotice_tx {
  __typename: "Transaction";
  id: string;
  amount: number;
  currency: TransactionCurrency;
}

export interface PaymentPayoutNotice {
  __typename: "TransactionNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  tx: PaymentPayoutNotice_tx;
}
