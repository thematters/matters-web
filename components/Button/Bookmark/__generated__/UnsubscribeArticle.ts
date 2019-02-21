/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnsubscribeArticle
// ====================================================

export interface UnsubscribeArticle_unsubscribeArticle {
  __typename: "Article";
  id: string;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface UnsubscribeArticle {
  unsubscribeArticle: UnsubscribeArticle_unsubscribeArticle;
}

export interface UnsubscribeArticleVariables {
  id: string;
}
