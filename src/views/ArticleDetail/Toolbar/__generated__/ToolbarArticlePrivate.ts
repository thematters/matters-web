/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ToolbarArticlePrivate
// ====================================================

export interface ToolbarArticlePrivate_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface ToolbarArticlePrivate {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
  /**
   * This value determines if current viewer has appreciated or not.
   */
  hasAppreciate: boolean;
  /**
   * Number represents how many times per user can appreciate this article.
   */
  appreciateLeft: number;
  /**
   * This value determines if current viewer can SuperLike or not.
   */
  canSuperLike: boolean;
  /**
   * Author of this article.
   */
  author: ToolbarArticlePrivate_author;
}
