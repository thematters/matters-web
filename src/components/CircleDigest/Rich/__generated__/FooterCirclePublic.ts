/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FooterCirclePublic
// ====================================================

export interface FooterCirclePublic_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface FooterCirclePublic_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface FooterCirclePublic_prices {
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

export interface FooterCirclePublic {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * List of Circle member.
   */
  members: FooterCirclePublic_members;
  /**
   * List of works belong to this Circle.
   */
  works: FooterCirclePublic_works;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * Prices offered by this Circle.
   */
  prices: FooterCirclePublic_prices[] | null;
}
