/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, CommentState, CommentType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleNewCommentNotice
// ====================================================

export interface ArticleNewCommentNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleNewCommentNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleNewCommentNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleNewCommentNotice_actors_info_badges[] | null;
}

export interface ArticleNewCommentNotice_actors {
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
  liker: ArticleNewCommentNotice_actors_liker;
  /**
   * User information.
   */
  info: ArticleNewCommentNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface ArticleNewCommentNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface ArticleNewCommentNotice_comment_node_Article_author {
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

export interface ArticleNewCommentNotice_comment_node_Article {
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
  author: ArticleNewCommentNotice_comment_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface ArticleNewCommentNotice_comment_node_Circle {
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

export type ArticleNewCommentNotice_comment_node = ArticleNewCommentNotice_comment_node_User | ArticleNewCommentNotice_comment_node_Article | ArticleNewCommentNotice_comment_node_Circle;

export interface ArticleNewCommentNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface ArticleNewCommentNotice_comment_author {
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

export interface ArticleNewCommentNotice_comment {
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
  node: ArticleNewCommentNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: ArticleNewCommentNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: ArticleNewCommentNotice_comment_author;
}

export interface ArticleNewCommentNotice {
  __typename: "CommentNotice";
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
  actors: ArticleNewCommentNotice_actors[] | null;
  comment: ArticleNewCommentNotice_comment;
}
