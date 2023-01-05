/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CreatedAtComment
// ====================================================

export interface CreatedAtComment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CreatedAtComment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface CreatedAtComment_node_Article_author {
  __typename: "User";
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface CreatedAtComment_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
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
  author: CreatedAtComment_node_Article_author;
}

export interface CreatedAtComment_node_Circle {
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

export type CreatedAtComment_node = CreatedAtComment_node_User | CreatedAtComment_node_Article | CreatedAtComment_node_Circle;

export interface CreatedAtComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CreatedAtComment_parentComment | null;
  /**
   * Current comment belongs to which Node.
   */
  node: CreatedAtComment_node;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
}
