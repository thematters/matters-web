/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerLikeBalance
// ====================================================

export interface ViewerLikeBalance_viewer_liker {
  __typename: "Liker";
  /**
   * Total LIKE left in wallet.
   */
  total: number;
  /**
   * Rate of LikeCoin/USD
   */
  rateUSD: number | null;
}

export interface ViewerLikeBalance_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: ViewerLikeBalance_viewer_liker;
}

export interface ViewerLikeBalance {
  viewer: ViewerLikeBalance_viewer | null;
}
