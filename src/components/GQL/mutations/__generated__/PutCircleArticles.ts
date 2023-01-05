/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PutCircleArticlesType, ArticleAccessType, ArticleLicenseType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PutCircleArticles
// ====================================================

export interface PutCircleArticles_putCircleArticles {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export interface PutCircleArticles {
  /**
   * Add or remove Circle's articles
   */
  putCircleArticles: PutCircleArticles_putCircleArticles;
}

export interface PutCircleArticlesVariables {
  id: string;
  articles?: string[] | null;
  type: PutCircleArticlesType;
  accessType: ArticleAccessType;
  license: ArticleLicenseType;
}
