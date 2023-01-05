/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AppreciateArticle
// ====================================================

export interface AppreciateArticle_appreciateArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * This value determines if current viewer can SuperLike or not.
   */
  canSuperLike: boolean;
}

export interface AppreciateArticle {
  /**
   * Appreciate an article.
   */
  appreciateArticle: AppreciateArticle_appreciateArticle;
}

export interface AppreciateArticleVariables {
  id: string;
  amount: any;
  token: string;
  superLike?: boolean | null;
}
