/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WalletLoginInput, AuthResultType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: WalletLogin
// ====================================================

export interface WalletLogin_walletLogin {
  __typename: "AuthResult";
  token: string | null;
  auth: boolean;
  type: AuthResultType;
}

export interface WalletLogin {
  /**
   * Login/Signup via a wallet.
   */
  walletLogin: WalletLogin_walletLogin;
}

export interface WalletLoginVariables {
  input: WalletLoginInput;
}
