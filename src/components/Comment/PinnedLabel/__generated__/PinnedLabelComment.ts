/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PinnedLabelComment
// ====================================================

export interface PinnedLabelComment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface PinnedLabelComment_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
}

export interface PinnedLabelComment_node_Circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export type PinnedLabelComment_node = PinnedLabelComment_node_User | PinnedLabelComment_node_Article | PinnedLabelComment_node_Circle;

export interface PinnedLabelComment {
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
  node: PinnedLabelComment_node;
}
