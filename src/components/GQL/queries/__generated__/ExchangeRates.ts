/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionCurrency, QuoteCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ExchangeRates
// ====================================================

export interface ExchangeRates_exchangeRates {
  __typename: "ExchangeRate";
  from: TransactionCurrency;
  to: QuoteCurrency;
  rate: number;
  /**
   * Last updated time from currency convertor APIs
   */
  updatedAt: any;
}

export interface ExchangeRates {
  exchangeRates: ExchangeRates_exchangeRates[] | null;
}

export interface ExchangeRatesVariables {
  from?: TransactionCurrency | null;
  to?: QuoteCurrency | null;
}
