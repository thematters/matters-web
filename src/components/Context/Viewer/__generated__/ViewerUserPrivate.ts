/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ViewerUserPrivate
// ====================================================

export interface ViewerUserPrivate_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ViewerUserPrivate_settings {
  __typename: "UserSettings";
  /**
   * User currency preference.
   */
  currency: QuoteCurrency;
}

export interface ViewerUserPrivate {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Articles authored by current user.
   */
  articles: ViewerUserPrivate_articles;
  /**
   * User settings.
   */
  settings: ViewerUserPrivate_settings;
}
