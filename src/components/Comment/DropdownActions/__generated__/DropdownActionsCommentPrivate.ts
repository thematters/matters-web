/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DropdownActionsCommentPrivate
// ====================================================

export interface DropdownActionsCommentPrivate_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface DropdownActionsCommentPrivate_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface DropdownActionsCommentPrivate_node_Circle_owner {
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

export interface DropdownActionsCommentPrivate_node_Circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: DropdownActionsCommentPrivate_node_Circle_owner;
}

export interface DropdownActionsCommentPrivate_node_Article_author {
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

export interface DropdownActionsCommentPrivate_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: DropdownActionsCommentPrivate_node_Article_author;
}

export type DropdownActionsCommentPrivate_node = DropdownActionsCommentPrivate_node_User | DropdownActionsCommentPrivate_node_Circle | DropdownActionsCommentPrivate_node_Article;

export interface DropdownActionsCommentPrivate {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: DropdownActionsCommentPrivate_author;
  /**
   * Current comment belongs to which Node.
   */
  node: DropdownActionsCommentPrivate_node;
}
