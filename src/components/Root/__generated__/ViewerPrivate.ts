/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteCurrency } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ViewerPrivate
// ====================================================

export interface ViewerPrivate_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ViewerPrivate_settings {
  __typename: "UserSettings";
  /**
   * User currency preference.
   */
  currency: QuoteCurrency;
}

export interface ViewerPrivate {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Articles authored by current user.
   */
  articles: ViewerPrivate_articles;
  /**
   * User settings.
   */
  settings: ViewerPrivate_settings;
}
