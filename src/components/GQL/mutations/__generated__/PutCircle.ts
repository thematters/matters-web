/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PutCircleInput, TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PutCircle
// ====================================================

export interface PutCircle_putCircle_prices {
  __typename: "Price";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Amount of Price.
   */
  amount: number;
  /**
   * Currency of Price.
   */
  currency: TransactionCurrency;
}

export interface PutCircle_putCircle {
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
   * Human readable name of this Circle.
   */
  displayName: string;
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * Circle cover's link.
   */
  cover: string | null;
  /**
   * Prices offered by this Circle.
   */
  prices: PutCircle_putCircle_prices[] | null;
}

export interface PutCircle {
  /**
   * Create or update a Circle.
   */
  putCircle: PutCircle_putCircle;
}

export interface PutCircleVariables {
  input: PutCircleInput;
}
