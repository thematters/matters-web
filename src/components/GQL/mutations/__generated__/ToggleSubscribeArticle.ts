/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleSubscribeArticle
// ====================================================

export interface ToggleSubscribeArticle_toggleSubscribeArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export interface ToggleSubscribeArticle {
  /**
   * Subscribe or Unsubscribe article
   */
  toggleSubscribeArticle: ToggleSubscribeArticle_toggleSubscribeArticle;
}

export interface ToggleSubscribeArticleVariables {
  id: string;
  enabled?: boolean | null;
}
