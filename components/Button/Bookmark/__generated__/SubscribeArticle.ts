/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubscribeArticle
// ====================================================

export interface SubscribeArticle_subscribeArticle {
  __typename: "Article";
  id: string;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface SubscribeArticle {
  subscribeArticle: SubscribeArticle_subscribeArticle;
}

export interface SubscribeArticleVariables {
  id: string;
}
