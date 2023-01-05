/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionCurrency } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FollowingFeedRecommendCircleFooterPublic
// ====================================================

export interface FollowingFeedRecommendCircleFooterPublic_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface FollowingFeedRecommendCircleFooterPublic_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface FollowingFeedRecommendCircleFooterPublic_prices {
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

export interface FollowingFeedRecommendCircleFooterPublic {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * List of Circle member.
   */
  members: FollowingFeedRecommendCircleFooterPublic_members;
  /**
   * List of works belong to this Circle.
   */
  works: FollowingFeedRecommendCircleFooterPublic_works;
  /**
   * Prices offered by this Circle.
   */
  prices: FollowingFeedRecommendCircleFooterPublic_prices[] | null;
}
