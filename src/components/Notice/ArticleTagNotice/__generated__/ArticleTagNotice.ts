/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleTagNoticeType, BadgeType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleTagNotice
// ====================================================

export interface ArticleTagNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleTagNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleTagNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleTagNotice_actors_info_badges[] | null;
}

export interface ArticleTagNotice_actors {
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
  liker: ArticleTagNotice_actors_liker;
  /**
   * User information.
   */
  info: ArticleTagNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface ArticleTagNotice_target_author {
  __typename: "User";
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface ArticleTagNotice_target {
  __typename: "Article";
  /**
   * Author of this article.
   */
  author: ArticleTagNotice_target_author;
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
}

export interface ArticleTagNotice_tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface ArticleTagNotice {
  __typename: "ArticleTagNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  articleTagNoticeType: ArticleTagNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: ArticleTagNotice_actors[] | null;
  target: ArticleTagNotice_target;
  tag: ArticleTagNotice_tag;
}
