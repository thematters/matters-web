/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FooterActionsCommentPrivate
// ====================================================

export interface FooterActionsCommentPrivate_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface FooterActionsCommentPrivate_node_Circle_owner {
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

export interface FooterActionsCommentPrivate_node_Circle {
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
  owner: FooterActionsCommentPrivate_node_Circle_owner;
}

export interface FooterActionsCommentPrivate_node_Article_author {
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

export interface FooterActionsCommentPrivate_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: FooterActionsCommentPrivate_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type FooterActionsCommentPrivate_node = FooterActionsCommentPrivate_node_User | FooterActionsCommentPrivate_node_Circle | FooterActionsCommentPrivate_node_Article;

export interface FooterActionsCommentPrivate_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface FooterActionsCommentPrivate {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: FooterActionsCommentPrivate_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: FooterActionsCommentPrivate_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
}
