/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLanguage } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleTranslation
// ====================================================

export interface ArticleTranslation_article_translation {
  __typename: "ArticleTranslation";
  content: string | null;
  title: string | null;
  summary: string | null;
  language: string | null;
}

export interface ArticleTranslation_article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Translation of article title and content.
   */
  translation: ArticleTranslation_article_translation | null;
}

export interface ArticleTranslation {
  article: ArticleTranslation_article | null;
}

export interface ArticleTranslationVariables {
  mediaHash: string;
  language: UserLanguage;
}
