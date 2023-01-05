/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleTagUnselectedNotice
// ====================================================

export interface ArticleTagUnselectedNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleTagUnselectedNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleTagUnselectedNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleTagUnselectedNotice_actors_info_badges[] | null;
}

export interface ArticleTagUnselectedNotice_actors {
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
  liker: ArticleTagUnselectedNotice_actors_liker;
  /**
   * User information.
   */
  info: ArticleTagUnselectedNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface ArticleTagUnselectedNotice_target_author {
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

export interface ArticleTagUnselectedNotice_target {
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
  /**
   * Author of this article.
   */
  author: ArticleTagUnselectedNotice_target_author;
}

export interface ArticleTagUnselectedNotice_tag {
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

export interface ArticleTagUnselectedNotice {
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
  actors: ArticleTagUnselectedNotice_actors[] | null;
  target: ArticleTagUnselectedNotice_target;
  tag: ArticleTagUnselectedNotice_tag;
}
