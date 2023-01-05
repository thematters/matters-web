/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote, CommentType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: LatestResponsesPrivate
// ====================================================

export interface LatestResponsesPrivate_nodes_Article {
  __typename: "Article" | "User" | "Tag" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface LatestResponsesPrivate_nodes_Comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface LatestResponsesPrivate_nodes_Comment_node_Circle_owner {
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

export interface LatestResponsesPrivate_nodes_Comment_node_Circle {
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
  owner: LatestResponsesPrivate_nodes_Comment_node_Circle_owner;
}

export interface LatestResponsesPrivate_nodes_Comment_node_Article_author {
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

export interface LatestResponsesPrivate_nodes_Comment_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: LatestResponsesPrivate_nodes_Comment_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type LatestResponsesPrivate_nodes_Comment_node = LatestResponsesPrivate_nodes_Comment_node_User | LatestResponsesPrivate_nodes_Comment_node_Circle | LatestResponsesPrivate_nodes_Comment_node_Article;

export interface LatestResponsesPrivate_nodes_Comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface LatestResponsesPrivate_nodes_Comment_author {
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

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Circle_owner {
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

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Circle {
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
  owner: LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Circle_owner;
}

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Article_author {
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

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Article_author;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export type LatestResponsesPrivate_nodes_Comment_comments_edges_node_node = LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_User | LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Circle | LatestResponsesPrivate_nodes_Comment_comments_edges_node_node_Article;

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node_author {
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

export interface LatestResponsesPrivate_nodes_Comment_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: LatestResponsesPrivate_nodes_Comment_comments_edges_node_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: LatestResponsesPrivate_nodes_Comment_comments_edges_node_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: LatestResponsesPrivate_nodes_Comment_comments_edges_node_author;
}

export interface LatestResponsesPrivate_nodes_Comment_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: LatestResponsesPrivate_nodes_Comment_comments_edges_node;
}

export interface LatestResponsesPrivate_nodes_Comment_comments {
  __typename: "CommentConnection";
  edges: LatestResponsesPrivate_nodes_Comment_comments_edges[] | null;
}

export interface LatestResponsesPrivate_nodes_Comment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Current comment belongs to which Node.
   */
  node: LatestResponsesPrivate_nodes_Comment_node;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: LatestResponsesPrivate_nodes_Comment_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: LatestResponsesPrivate_nodes_Comment_author;
  /**
   * Descendant comments of this comment.
   */
  comments: LatestResponsesPrivate_nodes_Comment_comments;
}

export type LatestResponsesPrivate_nodes = LatestResponsesPrivate_nodes_Article | LatestResponsesPrivate_nodes_Comment;

export interface LatestResponsesPrivate {
  nodes: LatestResponsesPrivate_nodes[] | null;
}

export interface LatestResponsesPrivateVariables {
  ids: string[];
}
