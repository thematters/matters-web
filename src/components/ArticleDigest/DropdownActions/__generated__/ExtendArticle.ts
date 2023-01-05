/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ExtendArticle
// ====================================================

export interface ExtendArticle_putDraft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Slugified draft title.
   */
  slug: string;
}

export interface ExtendArticle {
  /**
   * Create or update a draft.
   */
  putDraft: ExtendArticle_putDraft;
}

export interface ExtendArticleVariables {
  title: string;
  collection?: (string | null)[] | null;
}
