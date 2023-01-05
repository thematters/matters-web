/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, CommentState, CommentType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CommentNewReplyNotice
// ====================================================

export interface CommentNewReplyNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CommentNewReplyNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CommentNewReplyNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CommentNewReplyNotice_actors_info_badges[] | null;
}

export interface CommentNewReplyNotice_actors {
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
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CommentNewReplyNotice_actors_liker;
  /**
   * User information.
   */
  info: CommentNewReplyNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface CommentNewReplyNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface CommentNewReplyNotice_comment_node_Article_author {
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

export interface CommentNewReplyNotice_comment_node_Article {
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
  author: CommentNewReplyNotice_comment_node_Article_author;
}

export interface CommentNewReplyNotice_comment_node_Circle {
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

export type CommentNewReplyNotice_comment_node = CommentNewReplyNotice_comment_node_User | CommentNewReplyNotice_comment_node_Article | CommentNewReplyNotice_comment_node_Circle;

export interface CommentNewReplyNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CommentNewReplyNotice_comment_author {
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

export interface CommentNewReplyNotice_comment {
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
  node: CommentNewReplyNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: CommentNewReplyNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: CommentNewReplyNotice_comment_author;
}

export interface CommentNewReplyNotice_reply_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface CommentNewReplyNotice_reply_node_Article_author {
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

export interface CommentNewReplyNotice_reply_node_Article {
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
  author: CommentNewReplyNotice_reply_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface CommentNewReplyNotice_reply_node_Circle {
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
   * Human readable name of this Circle.
   */
  displayName: string;
}

export type CommentNewReplyNotice_reply_node = CommentNewReplyNotice_reply_node_User | CommentNewReplyNotice_reply_node_Article | CommentNewReplyNotice_reply_node_Circle;

export interface CommentNewReplyNotice_reply_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CommentNewReplyNotice_reply_author {
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

export interface CommentNewReplyNotice_reply {
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
  node: CommentNewReplyNotice_reply_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: CommentNewReplyNotice_reply_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: CommentNewReplyNotice_reply_author;
}

export interface CommentNewReplyNotice {
  __typename: "CommentCommentNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: CommentNewReplyNotice_actors[] | null;
  comment: CommentNewReplyNotice_comment;
  reply: CommentNewReplyNotice_reply;
}
