/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentBarArticlePrivate
// ====================================================

export interface CommentBarArticlePrivate_author {
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

export interface CommentBarArticlePrivate {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: CommentBarArticlePrivate_author;
}
