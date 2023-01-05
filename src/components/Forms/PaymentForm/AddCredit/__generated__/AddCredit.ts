/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddCreditInput, TransactionCurrency } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddCredit
// ====================================================

export interface AddCredit_addCredit_transaction {
  __typename: "Transaction";
  id: string;
  amount: number;
  fee: number;
  currency: TransactionCurrency;
}

export interface AddCredit_addCredit {
  __typename: "AddCreditResult";
  transaction: AddCredit_addCredit_transaction;
  /**
   * The client secret of this PaymentIntent.
   */
  client_secret: string;
}

export interface AddCredit {
  /**
   * Add Credit to User Wallet
   */
  addCredit: AddCredit_addCredit;
}

export interface AddCreditVariables {
  input: AddCreditInput;
}
