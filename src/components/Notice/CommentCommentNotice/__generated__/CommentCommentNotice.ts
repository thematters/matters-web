/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentCommentNoticeType, BadgeType, CommentState, CommentType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CommentCommentNotice
// ====================================================

export interface CommentCommentNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CommentCommentNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CommentCommentNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CommentCommentNotice_actors_info_badges[] | null;
}

export interface CommentCommentNotice_actors {
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
  liker: CommentCommentNotice_actors_liker;
  /**
   * User information.
   */
  info: CommentCommentNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface CommentCommentNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface CommentCommentNotice_comment_node_Article_author {
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

export interface CommentCommentNotice_comment_node_Article {
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
  author: CommentCommentNotice_comment_node_Article_author;
}

export interface CommentCommentNotice_comment_node_Circle {
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

export type CommentCommentNotice_comment_node = CommentCommentNotice_comment_node_User | CommentCommentNotice_comment_node_Article | CommentCommentNotice_comment_node_Circle;

export interface CommentCommentNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CommentCommentNotice_comment_author {
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

export interface CommentCommentNotice_comment {
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
  node: CommentCommentNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: CommentCommentNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: CommentCommentNotice_comment_author;
}

export interface CommentCommentNotice_reply_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface CommentCommentNotice_reply_node_Article_author {
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

export interface CommentCommentNotice_reply_node_Article {
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
  author: CommentCommentNotice_reply_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface CommentCommentNotice_reply_node_Circle {
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

export type CommentCommentNotice_reply_node = CommentCommentNotice_reply_node_User | CommentCommentNotice_reply_node_Article | CommentCommentNotice_reply_node_Circle;

export interface CommentCommentNotice_reply_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CommentCommentNotice_reply_author {
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

export interface CommentCommentNotice_reply {
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
  node: CommentCommentNotice_reply_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: CommentCommentNotice_reply_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: CommentCommentNotice_reply_author;
}

export interface CommentCommentNotice {
  __typename: "CommentCommentNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  commentCommentNoticeType: CommentCommentNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: CommentCommentNotice_actors[] | null;
  comment: CommentCommentNotice_comment;
  reply: CommentCommentNotice_reply;
}
