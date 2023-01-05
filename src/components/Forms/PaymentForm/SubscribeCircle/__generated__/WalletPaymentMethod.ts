/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WalletPaymentMethod
// ====================================================

export interface WalletPaymentMethod_viewer_wallet {
  __typename: "Wallet";
  /**
   * The last four digits of the card.
   */
  cardLast4: string | null;
}

export interface WalletPaymentMethod_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User Wallet
   */
  wallet: WalletPaymentMethod_viewer_wallet;
}

export interface WalletPaymentMethod {
  viewer: WalletPaymentMethod_viewer | null;
}
