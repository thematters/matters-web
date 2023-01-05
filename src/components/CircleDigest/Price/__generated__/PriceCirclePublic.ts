/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PriceCirclePublic
// ====================================================

export interface PriceCirclePublic_prices {
  __typename: "Price";
  /**
   * Amount of Price.
   */
  amount: number;
  /**
   * Currency of Price.
   */
  currency: TransactionCurrency;
}

export interface PriceCirclePublic {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * Prices offered by this Circle.
   */
  prices: PriceCirclePublic_prices[] | null;
}
