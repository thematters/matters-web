/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote, CommentType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: FeaturedCommentsPrivate
// ====================================================

export interface FeaturedCommentsPrivate_nodes_Article {
  __typename: "Article" | "User" | "Tag" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface FeaturedCommentsPrivate_nodes_Comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface FeaturedCommentsPrivate_nodes_Comment_node_Circle_owner {
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

export interface FeaturedCommentsPrivate_nodes_Comment_node_Circle {
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
  owner: FeaturedCommentsPrivate_nodes_Comment_node_Circle_owner;
}

export interface FeaturedCommentsPrivate_nodes_Comment_node_Article_author {
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

export interface FeaturedCommentsPrivate_nodes_Comment_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: FeaturedCommentsPrivate_nodes_Comment_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type FeaturedCommentsPrivate_nodes_Comment_node = FeaturedCommentsPrivate_nodes_Comment_node_User | FeaturedCommentsPrivate_nodes_Comment_node_Circle | FeaturedCommentsPrivate_nodes_Comment_node_Article;

export interface FeaturedCommentsPrivate_nodes_Comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface FeaturedCommentsPrivate_nodes_Comment_author {
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

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Circle_owner {
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

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Circle {
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
  owner: FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Circle_owner;
}

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Article_author {
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

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node = FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_User | FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Circle | FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node_Article;

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_author {
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

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: FeaturedCommentsPrivate_nodes_Comment_comments_edges_node_author;
}

export interface FeaturedCommentsPrivate_nodes_Comment_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: FeaturedCommentsPrivate_nodes_Comment_comments_edges_node;
}

export interface FeaturedCommentsPrivate_nodes_Comment_comments {
  __typename: "CommentConnection";
  edges: FeaturedCommentsPrivate_nodes_Comment_comments_edges[] | null;
}

export interface FeaturedCommentsPrivate_nodes_Comment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: FeaturedCommentsPrivate_nodes_Comment_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: FeaturedCommentsPrivate_nodes_Comment_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: FeaturedCommentsPrivate_nodes_Comment_author;
  /**
   * Descendant comments of this comment.
   */
  comments: FeaturedCommentsPrivate_nodes_Comment_comments;
}

export type FeaturedCommentsPrivate_nodes = FeaturedCommentsPrivate_nodes_Article | FeaturedCommentsPrivate_nodes_Comment;

export interface FeaturedCommentsPrivate {
  nodes: FeaturedCommentsPrivate_nodes[] | null;
}

export interface FeaturedCommentsPrivateVariables {
  ids: string[];
}
