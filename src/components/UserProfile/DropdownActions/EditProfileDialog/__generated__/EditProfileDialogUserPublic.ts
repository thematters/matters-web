/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: EditProfileDialogUserPublic
// ====================================================

export interface EditProfileDialogUserPublic_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface EditProfileDialogUserPublic_info {
  __typename: "UserInfo";
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: EditProfileDialogUserPublic_info_badges[] | null;
}

export interface EditProfileDialogUserPublic_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface EditProfileDialogUserPublic {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * User information.
   */
  info: EditProfileDialogUserPublic_info;
  /**
   * Liker info of current user
   */
  liker: EditProfileDialogUserPublic_liker;
}
