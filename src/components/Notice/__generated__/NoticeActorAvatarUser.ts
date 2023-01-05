/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: NoticeActorAvatarUser
// ====================================================

export interface NoticeActorAvatarUser_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface NoticeActorAvatarUser_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface NoticeActorAvatarUser_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: NoticeActorAvatarUser_info_badges[] | null;
}

export interface NoticeActorAvatarUser {
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
  liker: NoticeActorAvatarUser_liker;
  /**
   * User information.
   */
  info: NoticeActorAvatarUser_info;
}
