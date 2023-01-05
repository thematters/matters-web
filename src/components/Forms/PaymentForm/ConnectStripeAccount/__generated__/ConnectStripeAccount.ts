/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StripeAccountCountry } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ConnectStripeAccount
// ====================================================

export interface ConnectStripeAccount_connectStripeAccount {
  __typename: "ConnectStripeAccountResult";
  redirectUrl: string;
}

export interface ConnectStripeAccount {
  /**
   * Create Stripe Connect account for Payout
   */
  connectStripeAccount: ConnectStripeAccount_connectStripeAccount;
}

export interface ConnectStripeAccountVariables {
  country: StripeAccountCountry;
}
