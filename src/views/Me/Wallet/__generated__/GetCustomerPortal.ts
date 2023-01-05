/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomerPortal
// ====================================================

export interface GetCustomerPortal_viewer_wallet {
  __typename: "Wallet";
  /**
   * URL of Stripe Dashboard to manage subscription invoice and payment method
   */
  customerPortal: string | null;
}

export interface GetCustomerPortal_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User Wallet
   */
  wallet: GetCustomerPortal_viewer_wallet;
}

export interface GetCustomerPortal {
  viewer: GetCustomerPortal_viewer | null;
}
