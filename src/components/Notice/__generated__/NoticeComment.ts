/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState, CommentType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: NoticeComment
// ====================================================

export interface NoticeComment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface NoticeComment_node_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface NoticeComment_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: NoticeComment_node_Article_author;
}

export interface NoticeComment_node_Circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
}

export type NoticeComment_node = NoticeComment_node_User | NoticeComment_node_Article | NoticeComment_node_Circle;

export interface NoticeComment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface NoticeComment_author {
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

export interface NoticeComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Current comment belongs to which Node.
   */
  node: NoticeComment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: NoticeComment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: NoticeComment_author;
}
