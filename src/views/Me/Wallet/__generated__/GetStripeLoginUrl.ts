/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStripeLoginUrl
// ====================================================

export interface GetStripeLoginUrl_viewer_wallet_stripeAccount {
  __typename: "StripeAccount";
  id: string;
  loginUrl: string;
}

export interface GetStripeLoginUrl_viewer_wallet {
  __typename: "Wallet";
  /**
   * Account of Stripe Connect to manage payout
   */
  stripeAccount: GetStripeLoginUrl_viewer_wallet_stripeAccount | null;
}

export interface GetStripeLoginUrl_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User Wallet
   */
  wallet: GetStripeLoginUrl_viewer_wallet;
}

export interface GetStripeLoginUrl {
  viewer: GetStripeLoginUrl_viewer | null;
}
