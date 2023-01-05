/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerStripeAccount
// ====================================================

export interface ViewerStripeAccount_viewer_wallet_stripeAccount {
  __typename: "StripeAccount";
  id: string;
}

export interface ViewerStripeAccount_viewer_wallet {
  __typename: "Wallet";
  /**
   * Account of Stripe Connect to manage payout
   */
  stripeAccount: ViewerStripeAccount_viewer_wallet_stripeAccount | null;
}

export interface ViewerStripeAccount_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User Wallet
   */
  wallet: ViewerStripeAccount_viewer_wallet;
}

export interface ViewerStripeAccount {
  viewer: ViewerStripeAccount_viewer | null;
}
