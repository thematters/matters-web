/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AppreciateArticle
// ====================================================

export interface AppreciateArticle_appreciateArticle {
  __typename: "Article";
  id: string;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  /**
   * Viewer has appreciate
   */
  hasAppreciate: boolean;
}

export interface AppreciateArticle {
  appreciateArticle: AppreciateArticle_appreciateArticle;
}

export interface AppreciateArticleVariables {
  id: string;
}
