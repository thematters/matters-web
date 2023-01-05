/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: EditProfileDialogUserPrivate
// ====================================================

export interface EditProfileDialogUserPrivate_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface EditProfileDialogUserPrivate_info_cryptoWallet_nfts {
  __typename: "NFTAsset";
  id: string;
  imageUrl: string;
  imagePreviewUrl: string | null;
  name: string;
  description: string | null;
}

export interface EditProfileDialogUserPrivate_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   * NFT assets owned by this wallet address
   */
  nfts: EditProfileDialogUserPrivate_info_cryptoWallet_nfts[] | null;
}

export interface EditProfileDialogUserPrivate_info {
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
  badges: EditProfileDialogUserPrivate_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: EditProfileDialogUserPrivate_info_cryptoWallet | null;
}

export interface EditProfileDialogUserPrivate_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface EditProfileDialogUserPrivate {
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
  info: EditProfileDialogUserPrivate_info;
  /**
   * Liker info of current user
   */
  liker: EditProfileDialogUserPrivate_liker;
}
