/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, CommentState, CommentType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: SubscribedArticleNewCommentNotice
// ====================================================

export interface SubscribedArticleNewCommentNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SubscribedArticleNewCommentNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SubscribedArticleNewCommentNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SubscribedArticleNewCommentNotice_actors_info_badges[] | null;
}

export interface SubscribedArticleNewCommentNotice_actors {
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
  liker: SubscribedArticleNewCommentNotice_actors_liker;
  /**
   * User information.
   */
  info: SubscribedArticleNewCommentNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface SubscribedArticleNewCommentNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface SubscribedArticleNewCommentNotice_comment_node_Article_author {
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

export interface SubscribedArticleNewCommentNotice_comment_node_Article {
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
  author: SubscribedArticleNewCommentNotice_comment_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface SubscribedArticleNewCommentNotice_comment_node_Circle {
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

export type SubscribedArticleNewCommentNotice_comment_node = SubscribedArticleNewCommentNotice_comment_node_User | SubscribedArticleNewCommentNotice_comment_node_Article | SubscribedArticleNewCommentNotice_comment_node_Circle;

export interface SubscribedArticleNewCommentNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface SubscribedArticleNewCommentNotice_comment_author {
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

export interface SubscribedArticleNewCommentNotice_comment {
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
  node: SubscribedArticleNewCommentNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: SubscribedArticleNewCommentNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: SubscribedArticleNewCommentNotice_comment_author;
}

export interface SubscribedArticleNewCommentNotice {
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
  actors: SubscribedArticleNewCommentNotice_actors[] | null;
  comment: SubscribedArticleNewCommentNotice_comment;
}
