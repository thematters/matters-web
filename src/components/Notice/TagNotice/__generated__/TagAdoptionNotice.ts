/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: TagAdoptionNotice
// ====================================================

export interface TagAdoptionNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagAdoptionNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagAdoptionNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagAdoptionNotice_actors_info_badges[] | null;
}

export interface TagAdoptionNotice_actors {
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
  liker: TagAdoptionNotice_actors_liker;
  /**
   * User information.
   */
  info: TagAdoptionNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface TagAdoptionNotice_tag {
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

export interface TagAdoptionNotice {
  __typename: "TagNotice";
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
  actors: TagAdoptionNotice_actors[] | null;
  tag: TagAdoptionNotice_tag;
}
