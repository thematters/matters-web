/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserCommentsPrivate
// ====================================================

export interface UserCommentsPrivate_nodes_Article {
  __typename: "Article" | "User" | "Tag" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface UserCommentsPrivate_nodes_Comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface UserCommentsPrivate_nodes_Comment_node_Circle_owner {
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

export interface UserCommentsPrivate_nodes_Comment_node_Circle {
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
  owner: UserCommentsPrivate_nodes_Comment_node_Circle_owner;
}

export interface UserCommentsPrivate_nodes_Comment_node_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface UserCommentsPrivate_nodes_Comment_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: UserCommentsPrivate_nodes_Comment_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type UserCommentsPrivate_nodes_Comment_node = UserCommentsPrivate_nodes_Comment_node_User | UserCommentsPrivate_nodes_Comment_node_Circle | UserCommentsPrivate_nodes_Comment_node_Article;

export interface UserCommentsPrivate_nodes_Comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface UserCommentsPrivate_nodes_Comment_author {
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

export interface UserCommentsPrivate_nodes_Comment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: UserCommentsPrivate_nodes_Comment_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: UserCommentsPrivate_nodes_Comment_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: UserCommentsPrivate_nodes_Comment_author;
}

export type UserCommentsPrivate_nodes = UserCommentsPrivate_nodes_Article | UserCommentsPrivate_nodes_Comment;

export interface UserCommentsPrivate {
  nodes: UserCommentsPrivate_nodes[] | null;
}

export interface UserCommentsPrivateVariables {
  ids: string[];
}
