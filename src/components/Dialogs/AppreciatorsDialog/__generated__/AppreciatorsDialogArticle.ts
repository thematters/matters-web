/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppreciatorsDialogArticle
// ====================================================

export interface AppreciatorsDialogArticle_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface AppreciatorsDialogArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: AppreciatorsDialogArticle_appreciationsReceived;
}
