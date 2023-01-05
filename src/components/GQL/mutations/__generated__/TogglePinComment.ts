/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TogglePinComment
// ====================================================

export interface TogglePinComment_togglePinComment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface TogglePinComment_togglePinComment_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface TogglePinComment_togglePinComment_node_Circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export type TogglePinComment_togglePinComment_node = TogglePinComment_togglePinComment_node_User | TogglePinComment_togglePinComment_node_Article | TogglePinComment_togglePinComment_node_Circle;

export interface TogglePinComment_togglePinComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * This value determines this comment is pinned or not.
   */
  pinned: boolean;
  /**
   * Current comment belongs to which Node.
   */
  node: TogglePinComment_togglePinComment_node;
}

export interface TogglePinComment {
  /**
   * Pin or Unpin a comment.
   */
  togglePinComment: TogglePinComment_togglePinComment;
}

export interface TogglePinCommentVariables {
  id: string;
  enabled?: boolean | null;
}
