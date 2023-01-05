/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionCurrency, TransactionPurpose, Chain, TransactionState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PayTo
// ====================================================

export interface PayTo_payTo_transaction {
  __typename: "Transaction";
  id: string;
  state: TransactionState;
}

export interface PayTo_payTo {
  __typename: "PayToResult";
  transaction: PayTo_payTo_transaction;
  /**
   * Only available when paying with LIKE.
   */
  redirectUrl: string | null;
}

export interface PayTo {
  /**
   * Pay to another user or article
   */
  payTo: PayTo_payTo;
}

export interface PayToVariables {
  amount: any;
  currency: TransactionCurrency;
  purpose: TransactionPurpose;
  recipientId: string;
  targetId?: string | null;
  password?: string | null;
  chain?: Chain | null;
  txHash?: string | null;
}
