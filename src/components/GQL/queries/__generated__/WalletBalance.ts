/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WalletBalance
// ====================================================

export interface WalletBalance_viewer_wallet_balance {
  __typename: "Balance";
  HKD: number;
}

export interface WalletBalance_viewer_wallet_stripeAccount {
  __typename: "StripeAccount";
  id: string;
}

export interface WalletBalance_viewer_wallet {
  __typename: "Wallet";
  balance: WalletBalance_viewer_wallet_balance;
  /**
   * Account of Stripe Connect to manage payout
   */
  stripeAccount: WalletBalance_viewer_wallet_stripeAccount | null;
}

export interface WalletBalance_viewer_liker {
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

export interface WalletBalance_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User Wallet
   */
  wallet: WalletBalance_viewer_wallet;
  /**
   * Liker info of current user
   */
  liker: WalletBalance_viewer_liker;
}

export interface WalletBalance {
  viewer: WalletBalance_viewer | null;
}
