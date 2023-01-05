/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DropdownActionsCommentPublic
// ====================================================

export interface DropdownActionsCommentPublic_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DropdownActionsCommentPublic_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DropdownActionsCommentPublic_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface DropdownActionsCommentPublic_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface DropdownActionsCommentPublic_node_Circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * Circle owner.
   */
  owner: DropdownActionsCommentPublic_node_Circle_owner;
}

export interface DropdownActionsCommentPublic_node_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface DropdownActionsCommentPublic_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: DropdownActionsCommentPublic_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export type DropdownActionsCommentPublic_node = DropdownActionsCommentPublic_node_User | DropdownActionsCommentPublic_node_Circle | DropdownActionsCommentPublic_node_Article;

export interface DropdownActionsCommentPublic {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * State of this comment.
   */
  state: CommentState;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: DropdownActionsCommentPublic_author;
  /**
   * Parent comment of this comment.
   */
  parentComment: DropdownActionsCommentPublic_parentComment | null;
  /**
   * Current comment belongs to which Node.
   */
  node: DropdownActionsCommentPublic_node;
  /**
   * This value determines this comment is pinned or not.
   */
  pinned: boolean;
}
