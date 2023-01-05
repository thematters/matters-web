/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: AvatarUser
// ====================================================

export interface AvatarUser_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface AvatarUser_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface AvatarUser_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: AvatarUser_info_badges[] | null;
}

export interface AvatarUser {
  __typename: "User";
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: AvatarUser_liker;
  /**
   * User information.
   */
  info: AvatarUser_info;
}
