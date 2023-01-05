/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReadArticle
// ====================================================

export interface ReadArticle_readArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
}

export interface ReadArticle {
  /**
   * Read an article.
   */
  readArticle: ReadArticle_readArticle;
}

export interface ReadArticleVariables {
  id: string;
}
