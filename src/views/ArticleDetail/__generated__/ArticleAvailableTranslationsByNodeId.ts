/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLanguage } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleAvailableTranslationsByNodeId
// ====================================================

export interface ArticleAvailableTranslationsByNodeId_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface ArticleAvailableTranslationsByNodeId_article_Article {
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

export type ArticleAvailableTranslationsByNodeId_article = ArticleAvailableTranslationsByNodeId_article_User | ArticleAvailableTranslationsByNodeId_article_Article;

export interface ArticleAvailableTranslationsByNodeId {
  article: ArticleAvailableTranslationsByNodeId_article | null;
}

export interface ArticleAvailableTranslationsByNodeIdVariables {
  id: string;
}
