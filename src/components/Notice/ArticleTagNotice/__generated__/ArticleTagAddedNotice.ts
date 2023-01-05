/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleTagAddedNotice
// ====================================================

export interface ArticleTagAddedNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleTagAddedNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleTagAddedNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleTagAddedNotice_actors_info_badges[] | null;
}

export interface ArticleTagAddedNotice_actors {
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
  liker: ArticleTagAddedNotice_actors_liker;
  /**
   * User information.
   */
  info: ArticleTagAddedNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface ArticleTagAddedNotice_target_author {
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

export interface ArticleTagAddedNotice_target {
  __typename: "Article";
  /**
   * Author of this article.
   */
  author: ArticleTagAddedNotice_target_author;
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

export interface ArticleTagAddedNotice_tag {
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

export interface ArticleTagAddedNotice {
  __typename: "ArticleTagNotice";
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
  actors: ArticleTagAddedNotice_actors[] | null;
  target: ArticleTagAddedNotice_target;
  tag: ArticleTagAddedNotice_tag;
}
