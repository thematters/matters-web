/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SetCurrencyInput, QuoteCurrency } from "./../../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetCurrency
// ====================================================

export interface SetCurrency_setCurrency_settings {
  __typename: "UserSettings";
  /**
   * User currency preference.
   */
  currency: QuoteCurrency;
}

export interface SetCurrency_setCurrency {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: SetCurrency_setCurrency_settings;
}

export interface SetCurrency {
  /**
   * Set user currency preference.
   */
  setCurrency: SetCurrency_setCurrency;
}

export interface SetCurrencyVariables {
  input: SetCurrencyInput;
}
