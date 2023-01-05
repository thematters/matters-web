/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ThreadCommentCommentPrivate
// ====================================================

export interface ThreadCommentCommentPrivate_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface ThreadCommentCommentPrivate_node_Circle_owner {
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

export interface ThreadCommentCommentPrivate_node_Circle {
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
  owner: ThreadCommentCommentPrivate_node_Circle_owner;
}

export interface ThreadCommentCommentPrivate_node_Article_author {
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

export interface ThreadCommentCommentPrivate_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: ThreadCommentCommentPrivate_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type ThreadCommentCommentPrivate_node = ThreadCommentCommentPrivate_node_User | ThreadCommentCommentPrivate_node_Circle | ThreadCommentCommentPrivate_node_Article;

export interface ThreadCommentCommentPrivate_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface ThreadCommentCommentPrivate_author {
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

export interface ThreadCommentCommentPrivate_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface ThreadCommentCommentPrivate_comments_edges_node_node_Circle_owner {
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

export interface ThreadCommentCommentPrivate_comments_edges_node_node_Circle {
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
  owner: ThreadCommentCommentPrivate_comments_edges_node_node_Circle_owner;
}

export interface ThreadCommentCommentPrivate_comments_edges_node_node_Article_author {
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

export interface ThreadCommentCommentPrivate_comments_edges_node_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: ThreadCommentCommentPrivate_comments_edges_node_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type ThreadCommentCommentPrivate_comments_edges_node_node = ThreadCommentCommentPrivate_comments_edges_node_node_User | ThreadCommentCommentPrivate_comments_edges_node_node_Circle | ThreadCommentCommentPrivate_comments_edges_node_node_Article;

export interface ThreadCommentCommentPrivate_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface ThreadCommentCommentPrivate_comments_edges_node_author {
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

export interface ThreadCommentCommentPrivate_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: ThreadCommentCommentPrivate_comments_edges_node_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: ThreadCommentCommentPrivate_comments_edges_node_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: ThreadCommentCommentPrivate_comments_edges_node_author;
}

export interface ThreadCommentCommentPrivate_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: ThreadCommentCommentPrivate_comments_edges_node;
}

export interface ThreadCommentCommentPrivate_comments {
  __typename: "CommentConnection";
  edges: ThreadCommentCommentPrivate_comments_edges[] | null;
}

export interface ThreadCommentCommentPrivate {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: ThreadCommentCommentPrivate_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: ThreadCommentCommentPrivate_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: ThreadCommentCommentPrivate_author;
  /**
   * Descendant comments of this comment.
   */
  comments: ThreadCommentCommentPrivate_comments;
}
