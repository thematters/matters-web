/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLanguage } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleAvailableTranslations
// ====================================================

export interface ArticleAvailableTranslations_article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Available translation languages.
   */
  availableTranslations: UserLanguage[] | null;
}

export interface ArticleAvailableTranslations {
  article: ArticleAvailableTranslations_article | null;
}

export interface ArticleAvailableTranslationsVariables {
  mediaHash: string;
}
