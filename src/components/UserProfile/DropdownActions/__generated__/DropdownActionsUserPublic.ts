/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DropdownActionsUserPublic
// ====================================================

export interface DropdownActionsUserPublic_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DropdownActionsUserPublic_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DropdownActionsUserPublic_info {
  __typename: "UserInfo";
  /**
   * Connected wallet.
   */
  cryptoWallet: DropdownActionsUserPublic_info_cryptoWallet | null;
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
  badges: DropdownActionsUserPublic_info_badges[] | null;
}

export interface DropdownActionsUserPublic_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DropdownActionsUserPublic {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User information.
   */
  info: DropdownActionsUserPublic_info;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DropdownActionsUserPublic_liker;
}
