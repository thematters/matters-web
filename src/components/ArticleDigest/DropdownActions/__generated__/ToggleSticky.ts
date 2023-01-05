/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleSticky
// ====================================================

export interface ToggleSticky_editArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
}

export interface ToggleSticky {
  /**
   * Edit an article.
   */
  editArticle: ToggleSticky_editArticle;
}

export interface ToggleStickyVariables {
  id: string;
  sticky: boolean;
}
